import { createContext, useState, useEffect, useContext, useRef, type ReactNode } from 'react';

export interface User { id: string; username: string; imageUrl?: string; email?: string | null; }
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

export interface Member {
  id: string;
  role: string;
  user: User;
}

interface ChatContextData {
  currentUser: User | null;
  globalServer: Server | null;
  activeChannelId: string | null;
  changeChannel: (channelId: string) => void;
  isLoading: boolean;
  isMessagesLoading: boolean;
  connectAsGuest: (username: string) => Promise<void>; // <-- Nova Função Adicionada
  messages: Message[];
  sendMessage: (content: string, replyToId?: string, attachment?: { url: string; name: string; size: number }) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (messageId: string, newContent: string) => void;
  toggleReaction: (messageId: string, emoji: string) => void;
  members: Member[];
  onlineUsers: Set<string>;
  hasMoreMessages: boolean;
  isFetchingMore: boolean;
  fetchMoreMessages: () => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [globalServer, setGlobalServer] = useState<Server | null>(null);
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // <-- Agora começa como false
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  // Fecha o WebSocket se o usuário fechar a aba
  useEffect(() => {
    return () => { ws.current?.close(); };
  }, []);

  // Busca mensagens sempre que mudar de canal (trazendo as últimas 50)
  useEffect(() => {
    if (activeChannelId) {
      setIsMessagesLoading(true);
      setHasMoreMessages(true);
      fetch(`${API_URL}/channels/${activeChannelId}/messages?limit=50`)
        .then(res => res.json())
        .then(data => {
          setMessages(data);
          setIsMessagesLoading(false);
          if (data.length < 50) {
            setHasMoreMessages(false);
          }
        })
        .catch(err => {
          console.error('Erro ao buscar mensagens', err);
          setIsMessagesLoading(false);
        });
    }
  }, [activeChannelId]);

  const fetchMoreMessages = async () => {
    if (!activeChannelId || isFetchingMore || !hasMoreMessages || messages.length === 0) return;

    setIsFetchingMore(true);
    const firstMessageId = messages[0].id;

    try {
      const res = await fetch(`${API_URL}/channels/${activeChannelId}/messages?before=${firstMessageId}&limit=50`);
      const data = await res.json();

      if (data.length < 50) {
        setHasMoreMessages(false);
      }

      if (data.length > 0) {
        setMessages(prev => {
          const existingIds = new Set(prev.map(m => m.id));
          const filteredNew = data.filter((m: Message) => !existingIds.has(m.id));
          return [...filteredNew, ...prev];
        });
      }
    } catch (err) {
      console.error('Erro ao carregar mais mensagens', err);
    } finally {
      setIsFetchingMore(false);
    }
  };

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

      // Busca membros inicial do servidor
      if (data.globalServer) {
        try {
          const membersRes = await fetch(`${API_URL}/users/servers/${data.globalServer.id}/members`);
          const membersData = await membersRes.json();
          setMembers(membersData);
        } catch (err) {
          console.error('Erro ao buscar membros inicial:', err);
        }
      }

      // Conecta no WebSocket após criar o usuário
      ws.current = new WebSocket(WS_URL);
      ws.current.onopen = () => {
        console.log('🟢 WebSocket Conectado!');
        ws.current?.send(JSON.stringify({
          event: 'identify',
          data: { userId: data.user.id }
        }));
      };

      ws.current.onmessage = (event) => {
        const payload = JSON.parse(event.data);

        if (payload.event === 'onlineUsersList') {
          setOnlineUsers(new Set(payload.data.onlineUserIds));
        }

        if (payload.event === 'userStatusChanged') {
          const { userId, status } = payload.data;
          setOnlineUsers((prev) => {
            const next = new Set(prev);
            if (status === 'online') {
              next.add(userId);
            } else {
              next.delete(userId);
            }
            return next;
          });

          // Se um novo usuário ficou online e não o temos na lista de membros, recarrega
          setMembers((prevMembers) => {
            const exists = prevMembers.some(m => m.user.id === userId);
            if (!exists && status === 'online') {
              fetch(`${API_URL}/users/servers/${data.globalServer.id}/members`)
                .then(res => res.json())
                .then(membersList => setMembers(membersList))
                .catch(err => console.error('Erro ao recarregar membros:', err));
            }
            return prevMembers;
          });
        }

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

  const sendMessage = (
    content: string,
    replyToId?: string,
    attachment?: { url: string; name: string; size: number }
  ) => {
    if ((!content.trim() && !attachment) || !ws.current || !currentUser || !activeChannelId) return;

    let finalContent = content;

    if (attachment) {
      finalContent = JSON.stringify({
        text: content,
        fileUrl: attachment.url,
        fileName: attachment.name,
        fileSize: attachment.size
      });
    }

    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        event: 'sendMessage',
        data: { channelId: activeChannelId, userId: currentUser.id, content: finalContent, replyToId }
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
    <ChatContext.Provider
      value={{
        currentUser,
        globalServer,
        activeChannelId,
        changeChannel,
        isLoading,
        isMessagesLoading,
        connectAsGuest,
        messages,
        sendMessage,
        deleteMessage,
        editMessage,
        toggleReaction,
        members,
        onlineUsers,
        hasMoreMessages,
        isFetchingMore,
        fetchMoreMessages
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);