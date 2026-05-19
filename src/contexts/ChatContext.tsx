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
  replyToId?: string; // NOVO
  replyTo?: {         // NOVO
    id: string;
    content: string;
    user: { username: string };
  };
}

interface ChatContextData {
  currentUser: User | null;
  globalServer: Server | null;
  activeChannelId: string | null;
  changeChannel: (channelId: string) => void;
  isLoading: boolean;
  messages: Message[];
  sendMessage: (content: string, replyToId?: string) => void;
  deleteMessage: (messageId: string) => void; // NOVO
  editMessage: (messageId: string, newContent: string) => void; // NOVO
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [globalServer, setGlobalServer] = useState<Server | null>(null);
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetch(`${API_URL}/users/guest`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setCurrentUser(data.user);
        setGlobalServer(data.globalServer);

        if (data.globalServer?.channels?.length > 0) {
          setActiveChannelId(data.globalServer.channels[0].id);
        }

        ws.current = new WebSocket(WS_URL);
        ws.current.onopen = () => console.log('🟢 WebSocket Conectado!');

        ws.current.onmessage = (event) => {
          const payload = JSON.parse(event.data);

          // 1. CHEGOU MENSAGEM NOVA
          if (payload.event === 'newMessage') {
            const novaMensagem = payload.data as Message;
            setMessages((prev) => {
              if (prev.some(m => m.id === novaMensagem.id)) return prev;
              return [...prev, novaMensagem];
            });
          }

          // 2. MENSAGEM FOI DELETADA
          if (payload.event === 'messageDeleted') {
            setMessages((prev) => prev.filter(m => m.id !== payload.data.messageId));
          }

          // 3. MENSAGEM FOI EDITADA
          if (payload.event === 'messageEdited') {
            const mensagemEditada = payload.data as Message;
            setMessages((prev) => prev.map(m => m.id === mensagemEditada.id ? mensagemEditada : m));
          }
        };

        ws.current.onclose = () => console.log('🔴 WebSocket Desconectado');
        setIsLoading(false);
      } catch (error) {
        console.error('Erro na inicialização:', error);
        setIsLoading(false);
      }
    }
    init();

    return () => { ws.current?.close(); };
  }, []);

  useEffect(() => {
    if (activeChannelId) {
      fetch(`${API_URL}/channels/${activeChannelId}/messages`)
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error('Erro ao buscar mensagens', err));
    }
  }, [activeChannelId]);

  const changeChannel = (channelId: string) => setActiveChannelId(channelId);

  const sendMessage = (content: string, replyToId?: string) => {
    if (!content.trim() || !ws.current || !currentUser || !activeChannelId) return;

    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        event: 'sendMessage',
        data: {
          channelId: activeChannelId,
          userId: currentUser.id,
          content: content,
          replyToId: replyToId // NOVO
        }
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

  return (
    <ChatContext.Provider value={{ currentUser, globalServer, activeChannelId, changeChannel, isLoading, messages, sendMessage, deleteMessage, editMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);