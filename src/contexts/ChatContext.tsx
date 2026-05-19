import { createContext, useState, useEffect, useContext, useRef, type ReactNode } from 'react';

export interface User { id: string; username: string; imageUrl?: string; }
export interface Channel { id: string; name: string; type: string; }
export interface Server { id: string; name: string; imageUrl?: string; channels: Channel[]; }

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  user: User;
  channelId: string;
  replyToId?: string;
  replyTo?: {
    id: string;
    content: string;
    user: { username: string };
  };
  reactions?: Reaction[];
}

export interface Reaction {
  id: string;
  emoji: string;
  user: { id: string; username: string };
}

interface ChatContextData {
  currentUser: User | null;
  globalServer: Server | null;
  activeChannelId: string | null;
  changeChannel: (channelId: string) => void;
  isLoading: boolean;
  connectAsGuest: (username: string) => Promise<void>; // <-- Nova Função Adicionada
  messages: Message[];
  sendMessage: (content: string, replyToId?: string) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (messageId: string, newContent: string) => void;
  toggleReaction: (messageId: string, emoji: string) => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [globalServer, setGlobalServer] = useState<Server | null>(null);
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // <-- Agora começa como false

  const [messages, setMessages] = useState<Message[]>([]);
  const ws = useRef<WebSocket | null>(null);

  // Fecha o WebSocket se o usuário fechar a aba
  useEffect(() => {
    return () => { ws.current?.close(); };
  }, []);

  // Busca mensagens sempre que mudar de canal
  useEffect(() => {
    if (activeChannelId) {
      fetch(`${API_URL}/channels/${activeChannelId}/messages`)
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error('Erro ao buscar mensagens', err));
    }
  }, [activeChannelId]);

  // Função chamada pelo Modal para criar o usuário e conectar
  const connectAsGuest = async (username: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/guest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }), // <-- Enviamos o nome digitado!
      });
      const data = await response.json();
      setCurrentUser(data.user);
      setGlobalServer(data.globalServer);

      if (data.globalServer?.channels?.length > 0) {
        setActiveChannelId(data.globalServer.channels[0].id);
      }

      // Conecta no WebSocket após criar o usuário
      ws.current = new WebSocket(WS_URL);
      ws.current.onopen = () => console.log('🟢 WebSocket Conectado!');

      ws.current.onmessage = (event) => {
        const payload = JSON.parse(event.data);

        if (payload.event === 'newMessage') {
          setMessages((prev) => {
            if (prev.some(m => m.id === payload.data.id)) return prev;
            return [...prev, payload.data];
          });
        }
        if (payload.event === 'messageDeleted') {
          setMessages((prev) => prev.filter(m => m.id !== payload.data.messageId));
        }
        if (payload.event === 'messageEdited') {
          setMessages((prev) => prev.map(m => m.id === payload.data.id ? payload.data : m));
        }
        if (payload.event === 'reactionUpdated') {
          setMessages((prev) => prev.map(m => m.id === payload.data.id ? payload.data : m));
        }
      };

      ws.current.onclose = () => console.log('🔴 WebSocket Desconectado');
    } catch (error) {
      console.error('Erro na inicialização:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeChannel = (channelId: string) => setActiveChannelId(channelId);

  const sendMessage = (content: string, replyToId?: string) => {
    if (!content.trim() || !ws.current || !currentUser || !activeChannelId) return;
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        event: 'sendMessage',
        data: { channelId: activeChannelId, userId: currentUser.id, content, replyToId }
      }));
    }
  };

  const deleteMessage = (messageId: string) => {
    if (!ws.current) return;
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ event: 'deleteMessage', data: { messageId } }));
    }
  };

  const editMessage = (messageId: string, newContent: string) => {
    if (!newContent.trim() || !ws.current) return;
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ event: 'editMessage', data: { messageId, newContent } }));
    }
  };

  const toggleReaction = (messageId: string, emoji: string) => {
    if (!ws.current || !currentUser) return;
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        event: 'toggleReaction',
        data: { messageId, userId: currentUser.id, emoji }
      }));
    }
  };

  return (
    <ChatContext.Provider value={{ currentUser, globalServer, activeChannelId, changeChannel, isLoading, connectAsGuest, messages, sendMessage, deleteMessage, editMessage, toggleReaction }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);