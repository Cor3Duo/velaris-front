import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import {
  Hash, Search, Inbox, HelpCircle, PlusCircle, Gift, Sticker, Smile,
  Reply, Edit2, Trash2, Copy, X,
  XCircle,
  SmilePlus,
  Loader2,
  File,
  Eye,
  Download,
  ExternalLink,
  FileAudio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowLeft
} from 'lucide-react';
import { useChat, type Message } from '../../contexts/ChatContext';

import {
  Container, Header, HeaderTitle, HeaderIcons, SearchInput,
  MessagesList, MessageItem, AvatarContainer, Avatar, MessageContent,
  MessageHeader, Text, InputWrapper, InputContainer, RightIcons,
  ContextMenuWrapper, ContextMenuItem, ContextMenuDivider,
  EditMessageContainer, EditInput, EditHelper,
  ModalOverlay, ModalContainer, ModalHeader, ModalContent,
  MessagePreviewBox, ModalTip, ModalFooter,
  ReplyBanner, RepliedMessageWrapper,
  ReactionBadge,
  QuickReactionsBox,
  SkeletonRow, SkeletonAvatar, SkeletonTextWrapper, SkeletonHeader, SkeletonText,
  LoadingMoreContainer,
  AttachmentImage,
  AttachmentCard,
  UploadsContainer,
  UploadPreviewCard,
  LightboxOverlay,
  LightboxContent,
  LightboxCloseButton,
  LightboxToolbar,
  LightboxActionGroup,
  AudioCard,
  AudioHeader,
  AudioControls,
  UploadProgressCard,
  GifButton,
  GifPickerContainer,
  GifPickerHeader,
  GifPickerTab,
  GifPickerSearchWrapper,
  GifPickerSearchInput,
  GifPickerContent,
  GifCategoryGrid,
  GifCategoryCard,
  GifResultGrid,
  GifItemImage,
  GifPickerLoading,
  GifPickerFooter
} from './styles';

interface AudioPlayerProps {
  url: string;
  name: string;
  size: number;
}

function AudioPlayer({ url, name, size }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '-:--';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <AudioCard>
      <audio
        ref={audioRef}
        src={url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />
      <AudioHeader>
        <div className="audio-icon-wrapper">
          <FileAudio size={20} />
        </div>
        <div className="audio-info">
          <a href={url} target="_blank" rel="noopener noreferrer" title={name}>
            {name}
          </a>
          <span>{(size / (1024 * 1024)).toFixed(2)} MB</span>
        </div>
      </AudioHeader>
      <AudioControls>
        <button onClick={togglePlay}>
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>
        <div className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <input
          type="range"
          className="progress-slider"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
        />
        <button onClick={toggleMute}>
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </AudioControls>
    </AudioCard>
  );
}

interface GifCategory {
  name: string;
  bgUrl: string;
  gifs: string[];
}

const GIF_CATEGORIES: GifCategory[] = [
  {
    name: 'Favoritos',
    bgUrl: 'https://i.giphy.com/media/VdB3sz5hM8vyUR1tS9/giphy.gif',
    gifs: [
      'https://i.giphy.com/media/VdB3sz5hM8vyUR1tS9/giphy.gif',
      'https://i.giphy.com/media/3ogwFGExp9c9vRZv32/giphy.gif',
      'https://i.giphy.com/media/26n6Gx9moCgs1pUuk/giphy.gif',
      'https://i.giphy.com/media/l3V0lsG3Js1O9nGLK/giphy.gif'
    ]
  },
  {
    name: 'GIFs em alta',
    bgUrl: 'https://i.giphy.com/media/tJqyalvo9ahykfykAj/giphy.gif',
    gifs: [
      'https://i.giphy.com/media/tJqyalvo9ahykfykAj/giphy.gif',
      'https://i.giphy.com/media/mpxnrjQKLo0iA32r2C/giphy.gif',
      'https://i.giphy.com/media/mP8mWVA5QD4cE/giphy.gif',
      'https://i.giphy.com/media/tJZd6mye81Ko0/giphy.gif'
    ]
  },
  {
    name: 'hello',
    bgUrl: 'https://i.giphy.com/media/VdB3sz5hM8vyUR1tS9/giphy.gif',
    gifs: [
      'https://i.giphy.com/media/VdB3sz5hM8vyUR1tS9/giphy.gif',
      'https://i.giphy.com/media/3ogwFGExp9c9vRZv32/giphy.gif',
      'https://i.giphy.com/media/10JhviFuU2gWD6/giphy.gif',
      'https://i.giphy.com/media/cwbvBVSeymdQA/giphy.gif'
    ]
  },
  {
    name: 'lol',
    bgUrl: 'https://i.giphy.com/media/10JhviFuU2gWD6/giphy.gif',
    gifs: [
      'https://i.giphy.com/media/10JhviFuU2gWD6/giphy.gif',
      'https://i.giphy.com/media/26n6Gx9moCgs1pUuk/giphy.gif',
      'https://i.giphy.com/media/9MFsHEIJELD6E/giphy.gif',
      'https://i.giphy.com/media/143v0Z4767T15e/giphy.gif'
    ]
  },
  {
    name: 'love',
    bgUrl: 'https://i.giphy.com/media/l4FGlmpk9KUAyvS9O/giphy.gif',
    gifs: [
      'https://i.giphy.com/media/l4FGlmpk9KUAyvS9O/giphy.gif',
      'https://i.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif',
      'https://i.giphy.com/media/5Govl2ixfTAOY/giphy.gif',
      'https://i.giphy.com/media/Z1P59V3S1q1Mc/giphy.gif'
    ]
  },
  {
    name: 'happy birthday',
    bgUrl: 'https://i.giphy.com/media/kxG16FHstZvCo/giphy.gif',
    gifs: [
      'https://i.giphy.com/media/kxG16FHstZvCo/giphy.gif',
      'https://i.giphy.com/media/mcDUa4aHw8hNu/giphy.gif',
      'https://i.giphy.com/media/8FBCOCIf5UkCs/giphy.gif',
      'https://i.giphy.com/media/ljuS6rVYJDJeM/giphy.gif'
    ]
  },
  {
    name: 'applause',
    bgUrl: 'https://i.giphy.com/media/fnK0ja2ezSwC4/giphy.gif',
    gifs: [
      'https://i.giphy.com/media/fnK0ja2ezSwC4/giphy.gif',
      'https://i.giphy.com/media/5Govl2ixfTAOY/giphy.gif',
      'https://i.giphy.com/media/3oriO5iE1CcrxcBNI4/giphy.gif'
    ]
  },
  {
    name: 'dance',
    bgUrl: 'https://i.giphy.com/media/l3V0lsG3Js1O9nGLK/giphy.gif',
    gifs: [
      'https://i.giphy.com/media/l3V0lsG3Js1O9nGLK/giphy.gif',
      'https://i.giphy.com/media/143v0Z4767T15e/giphy.gif',
      'https://i.giphy.com/media/105OwsN7a4uqJ2/giphy.gif',
      'https://i.giphy.com/media/xJjs8eGVbjNYY/giphy.gif'
    ]
  },
  {
    name: 'scared',
    bgUrl: 'https://i.giphy.com/media/3o7TKChh54g6XzpHQQ/giphy.gif',
    gifs: [
      'https://i.giphy.com/media/3o7TKChh54g6XzpHQQ/giphy.gif',
      'https://i.giphy.com/media/14ut8LMmgSi0ug/giphy.gif',
      'https://i.giphy.com/media/l0MYryZTmQgvHI5qg/giphy.gif',
      'https://i.giphy.com/media/3o7TKSx0g7sxR9Mhyo/giphy.gif'
    ]
  },
  {
    name: 'crying',
    bgUrl: 'https://i.giphy.com/media/2WxWlkKW1cLPq/giphy.gif',
    gifs: [
      'https://i.giphy.com/media/2WxWlkKW1cLPq/giphy.gif',
      'https://i.giphy.com/media/12rQ7WkbXdP85y/giphy.gif',
      'https://i.giphy.com/media/KDRv3QggAj6Za/giphy.gif',
      'https://i.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif'
    ]
  }
];

export function ChatArea() {
  const {
    currentUser,
    globalServer,
    activeChannelId,
    messages,
    sendMessage,
    deleteMessage,
    editMessage,
    toggleReaction,
    isMessagesLoading,
    hasMoreMessages,
    isFetchingMore,
    fetchMoreMessages
  } = useChat();
  const [inputValue, setInputValue] = useState('');

  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, message: Message } | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null); // Guarda o ID da mensagem
  const quickEmojis = ['👍', '🤣', '❤️', '🔥', '😭', '👀'];
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);

  const [selectedFile, setSelectedFile] = useState<{ url: string; name: string; size: number } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadingFileName, setUploadingFileName] = useState<string>('');
  const [uploadingFileSize, setUploadingFileSize] = useState<number>(0);
  const uploadXhrRef = useRef<XMLHttpRequest | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<{ url: string; name: string } | null>(null);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifSearchQuery, setGifSearchQuery] = useState('');
  const [gifResults, setGifResults] = useState<string[]>([]);
  const [isGifsLoading, setIsGifsLoading] = useState(false);
  const [gifActiveTab, setGifActiveTab] = useState<'gifs' | 'figurinha' | 'emoji'>('gifs');
  const gifPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (gifPickerRef.current && !gifPickerRef.current.contains(e.target as Node)) {
        setShowGifPicker(false);
      }
    };
    if (showGifPicker) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showGifPicker]);

  useEffect(() => {
    if (!gifSearchQuery) {
      setGifResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsGifsLoading(true);
      const giphyApiKey = import.meta.env.VITE_GIPHY_API_KEY;
      if (giphyApiKey) {
        try {
          const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(gifSearchQuery)}&limit=30&rating=g`;
          const res = await fetch(endpoint);
          if (res.ok) {
            const data = await res.json();
            const urls = data.data.map((item: any) => `https://i.giphy.com/media/${item.id}/giphy.gif`);
            setGifResults(urls);
          } else {
            fallbackLocalSearch();
          }
        } catch (err) {
          console.error(err);
          fallbackLocalSearch();
        } finally {
          setIsGifsLoading(false);
        }
      } else {
        fallbackLocalSearch();
        setIsGifsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);

    function fallbackLocalSearch() {
      const query = gifSearchQuery.toLowerCase().trim();
      const matchedCategory = GIF_CATEGORIES.find(cat => 
        cat.name.toLowerCase() === query || 
        query.includes(cat.name.toLowerCase()) || 
        cat.name.toLowerCase().includes(query)
      );
      if (matchedCategory) {
        setGifResults(matchedCategory.gifs);
      } else {
        const matches: string[] = [];
        GIF_CATEGORIES.forEach(cat => {
          if (cat.name.toLowerCase().includes(query) || query.includes(cat.name.toLowerCase())) {
            matches.push(...cat.gifs);
          }
        });
        if (matches.length > 0) {
          setGifResults(Array.from(new Set(matches)));
        } else {
          const allGifs = Array.from(new Set(GIF_CATEGORIES.flatMap(cat => cat.gifs)));
          setGifResults(allGifs);
        }
      }
    }
  }, [gifSearchQuery]);

  const handleSendGif = (gifUrl: string) => {
    sendMessage(gifUrl);
    setShowGifPicker(false);
    setGifSearchQuery('');
  };

  const isImageUrl = (text: string) => {
    if (!text) return false;
    const trimmed = text.trim();
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return false;
    if (trimmed.includes(' ')) return false;
    return !!(trimmed.match(/\.(jpg|jpeg|png|gif|webp)($|\?)/i) || trimmed.includes('giphy.com/media/'));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCancelUpload = () => {
    if (uploadXhrRef.current) {
      uploadXhrRef.current.abort();
      uploadXhrRef.current = null;
    }
    setIsUploading(false);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('O arquivo excede o limite máximo de 10MB.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadingFileName(file.name);
    setUploadingFileSize(file.size);

    const formData = new FormData();
    formData.append('file', file);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const xhr = new XMLHttpRequest();
    uploadXhrRef.current = xhr;

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    });

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          setSelectedFile({
            url: data.url,
            name: data.name || file.name,
            size: file.size
          });
        } catch (err) {
          console.error(err);
          alert('Erro ao processar resposta do envio.');
        }
      } else {
        alert('Erro ao enviar o arquivo.');
      }
      setIsUploading(false);
      uploadXhrRef.current = null;
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    xhr.onerror = () => {
      alert('Erro de rede ao enviar o arquivo.');
      setIsUploading(false);
      uploadXhrRef.current = null;
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    xhr.open('POST', `${API_URL}/channels/upload`);
    xhr.send(formData);
  };

  const messagesListRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(messages.length);
  const activeChannelIdRef = useRef(activeChannelId);
  const prevScrollHeightRef = useRef<number>(0);
  const isPrependingRef = useRef<boolean>(false);

  // Monitora o evento de scroll para carregar mais mensagens ao rolar para o topo
  const handleScroll = () => {
    const container = messagesListRef.current;
    if (!container) return;

    if (container.scrollTop <= 10 && hasMoreMessages && !isFetchingMore && messages.length > 0) {
      prevScrollHeightRef.current = container.scrollHeight;
      isPrependingRef.current = true;
      fetchMoreMessages();
    }
  };

  // Ajusta a rolagem para ancorar na posição visual anterior ao prepending
  useLayoutEffect(() => {
    const container = messagesListRef.current;
    if (!container) return;

    if (isPrependingRef.current) {
      isPrependingRef.current = false;
      const heightDifference = container.scrollHeight - prevScrollHeightRef.current;
      container.scrollTop = heightDifference;
    }
  }, [messages]);

  // Rola para o final de forma imediata após terminar o carregamento das mensagens do canal
  useEffect(() => {
    if (!isMessagesLoading) {
      const container = messagesListRef.current;
      if (container) {
        // Aguarda a renderização completa das mensagens para capturar o scrollHeight atualizado
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 50);
      }
    }
  }, [isMessagesLoading]);

  // Rola para o final se receber nova mensagem e o usuário já estiver no final ou se for o próprio usuário enviando
  useEffect(() => {
    const container = messagesListRef.current;
    if (!container) return;

    const channelChanged = activeChannelIdRef.current !== activeChannelId;
    activeChannelIdRef.current = activeChannelId;

    if (channelChanged) {
      prevMessagesLength.current = messages.length;
      return;
    }

    if (messages.length > prevMessagesLength.current) {
      const lastMessage = messages[messages.length - 1];
      const sentByMe = lastMessage?.user.id === currentUser?.id;
      const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight <= 200;

      if (isAtBottom || sentByMe) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages, activeChannelId, currentUser?.id]);

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const activeChannel = globalServer?.channels.find(c => c.id === activeChannelId);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!inputValue.trim() && !selectedFile) return;
      sendMessage(inputValue, replyingTo?.id || undefined, selectedFile || undefined);
      setInputValue('');
      setReplyingTo(null);
      setSelectedFile(null);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, message: Message) => {
    e.preventDefault();
    const x = e.pageX + 220 > window.innerWidth ? window.innerWidth - 230 : e.pageX;
    const y = e.pageY + 200 > window.innerHeight ? window.innerHeight - 210 : e.pageY;
    setContextMenu({ x, y, message });
  };

  const handleReplyClick = () => {
    if (!contextMenu) return;
    setReplyingTo(contextMenu.message);
    setContextMenu(null);
  };

  const startEditing = () => {
    if (!contextMenu) return;

    let rawContent = contextMenu.message.content;
    try {
      const parsed = JSON.parse(contextMenu.message.content);
      if (parsed && parsed.text !== undefined) {
        rawContent = parsed.text;
      }
    } catch (e) {}

    setEditingMessageId(contextMenu.message.id);
    setEditingContent(rawContent);
    setContextMenu(null);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditingContent('');
  };

  const saveEditing = (msgId: string) => {
    const msg = messages.find(m => m.id === msgId);
    if (msg) {
      try {
        const parsed = JSON.parse(msg.content);
        if (parsed && (parsed.text !== undefined || parsed.fileUrl !== undefined)) {
          const updatedContent = JSON.stringify({
            ...parsed,
            text: editingContent
          });
          editMessage(msgId, updatedContent);
          cancelEditing();
          return;
        }
      } catch (e) {}
    }

    if (editingContent.trim() !== '') {
      editMessage(msgId, editingContent);
    }
    cancelEditing();
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, msgId: string) => {
    if (e.key === 'Escape') cancelEditing();
    else if (e.key === 'Enter') { e.preventDefault(); saveEditing(msgId); }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    if (!contextMenu) return;
    if (e.shiftKey) deleteMessage(contextMenu.message.id);
    else setMessageToDelete(contextMenu.message);
    setContextMenu(null);
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      deleteMessage(messageToDelete.id);
      setMessageToDelete(null);
    }
  };

  if (!activeChannel) return <Container />;

  return (
    <Container>
      <Header>
        <HeaderTitle><Hash size={24} color="#80848E" /><strong>{activeChannel.name}</strong></HeaderTitle>
        <HeaderIcons>
          <SearchInput><input type="text" placeholder="Buscar" /><Search size={16} /></SearchInput>
          <button><Inbox size={24} /></button>
          <button><HelpCircle size={24} /></button>
        </HeaderIcons>
      </Header>

      <MessagesList ref={messagesListRef} onScroll={handleScroll}>
        {isMessagesLoading ? (
          Array.from({ length: 6 }).map((_, i) => {
            const widths = ['65%', '40%', '80%', '50%', '70%', '55%'];
            return (
              <SkeletonRow key={i}>
                <SkeletonAvatar />
                <SkeletonTextWrapper>
                  <SkeletonHeader />
                  <SkeletonText $width={widths[i % widths.length]} />
                </SkeletonTextWrapper>
              </SkeletonRow>
            );
          })
        ) : (
          <>
            {isFetchingMore && (
              <LoadingMoreContainer>
                <Loader2 size={18} />
                Carregando histórico...
              </LoadingMoreContainer>
            )}
            {messages.map((msg, index) => {
              const prevMsg = index > 0 ? messages[index - 1] : null;

              const isSameUser = prevMsg?.user.id === msg.user.id;

              const timeDiff = prevMsg ? new Date(msg.createdAt).getTime() - new Date(prevMsg.createdAt).getTime() : 0;
              const isWithin5Min = timeDiff < 5 * 60 * 1000;
              const isReply = !!msg.replyTo;

              const isGrouped = Boolean(isSameUser && isWithin5Min && !isReply);

              // Tenta parsear mensagem com anexo
              let displayContent = msg.content;
              let attachment: { url: string; name: string; size: number } | null = null;

              try {
                const parsed = JSON.parse(msg.content);
                if (parsed && (parsed.text !== undefined || parsed.fileUrl !== undefined)) {
                  displayContent = parsed.text || '';
                  if (parsed.fileUrl) {
                    attachment = {
                      url: parsed.fileUrl,
                      name: parsed.fileName,
                      size: parsed.fileSize
                    };
                  }
                }
              } catch (e) {
                // Conteúdo é texto normal
              }

              return (
                <MessageItem
                  key={msg.id}
                  $isGrouped={isGrouped}
                  onContextMenu={(e) => handleContextMenu(e, msg)}
                >
                  <AvatarContainer $isGrouped={isGrouped}>
                    {isGrouped ? (
                      <span className="grouped-time">
                        {new Date(msg.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    ) : (
                      <Avatar style={{ backgroundColor: '#5865F2', marginTop: isReply ? '20px' : '0' }}>
                        {msg.user.username.charAt(0).toUpperCase()}
                      </Avatar>
                    )}
                  </AvatarContainer>

                  <MessageContent style={{ width: '100%' }}>
                    {isReply && (
                      <RepliedMessageWrapper>
                        <div className="tiny-avatar">{msg.replyTo!.user.username.charAt(0).toUpperCase()}</div>
                        <strong>@{msg.replyTo!.user.username}</strong>
                        <span className="reply-text">
                          {(() => {
                            try {
                              const parsedReply = JSON.parse(msg.replyTo!.content);
                              if (parsedReply && parsedReply.text !== undefined) {
                                return parsedReply.text || (parsedReply.fileUrl ? '📁 Arquivo' : '');
                              }
                            } catch (e) {}
                            return msg.replyTo!.content;
                          })()}
                        </span>
                      </RepliedMessageWrapper>
                    )}

                    {!isGrouped && (
                      <MessageHeader>
                        <strong>{msg.user.username}</strong>
                        <span>{new Date(msg.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </MessageHeader>
                    )}

                    {editingMessageId === msg.id ? (
                      <EditMessageContainer>
                        <EditInput autoFocus value={editingContent} onChange={(e) => setEditingContent(e.target.value)} onKeyDown={(e) => handleEditKeyDown(e, msg.id)} />
                        <EditHelper>esc para <span onClick={cancelEditing}>cancelar</span> • enter para <span onClick={() => saveEditing(msg.id)}>salvar</span></EditHelper>
                      </EditMessageContainer>
                    ) : (
                      <>
                        {displayContent && (
                          isImageUrl(displayContent) ? (
                            <>
                              <Text>
                                <a href={displayContent} target="_blank" rel="noopener noreferrer" style={{ color: '#00a8fc', textDecoration: 'none' }}>
                                  {displayContent}
                                </a>
                              </Text>
                              <AttachmentImage
                                src={displayContent}
                                alt="GIF/Imagem"
                                referrerPolicy="no-referrer"
                                onClick={() => setActiveLightboxImage({ url: displayContent, name: 'GIF/Imagem' })}
                                style={{ marginTop: '8px', cursor: 'zoom-in' }}
                              />
                            </>
                          ) : (
                            <Text>{displayContent}</Text>
                          )
                        )}

                        {attachment && (
                          (attachment.name && attachment.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) ? (
                            <AttachmentImage
                              src={attachment.url.startsWith('http') ? attachment.url : `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${attachment.url}`}
                              alt={attachment.name || 'Imagem'}
                              referrerPolicy="no-referrer"
                              onClick={() => setActiveLightboxImage({
                                url: attachment!.url.startsWith('http') ? attachment!.url : `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${attachment!.url}`,
                                name: attachment!.name || 'Imagem'
                              })}
                            />
                          ) : (attachment.name && attachment.name.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i)) ? (
                            <AudioPlayer
                              url={attachment.url.startsWith('http') ? attachment.url : `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${attachment.url}`}
                              name={attachment.name || 'Áudio'}
                              size={attachment.size}
                            />
                          ) : (
                            <AttachmentCard>
                              <div className="file-icon">
                                <File size={24} />
                              </div>
                              <div className="file-details">
                                <a
                                  href={attachment.url.startsWith('http') ? attachment.url : `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${attachment.url}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {attachment.name}
                                </a>
                                <span>{(attachment.size / (1024 * 1024)).toFixed(2)} MB</span>
                              </div>
                            </AttachmentCard>
                          )
                        )}
                      </>
                    )}
                  {/* Renderizar as Reações */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                      {Object.entries(
                        msg.reactions.reduce((acc, curr) => {
                          if (!acc[curr.emoji]) acc[curr.emoji] = { count: 0, me: false };
                          acc[curr.emoji].count++;
                          if (curr.user.id === currentUser?.id) acc[curr.emoji].me = true;
                          return acc;
                        }, {} as Record<string, { count: number; me: boolean }>)
                      ).map(([emoji, data]) => (
                        <ReactionBadge
                          key={emoji}
                          $active={data.me}
                          onClick={() => toggleReaction(msg.id, emoji)}
                        >
                          {emoji} <span>{data.count}</span>
                        </ReactionBadge>
                      ))}
                    </div>
                  )}
                </MessageContent>
              </MessageItem>
            );
          })}
          </>
        )}
      </MessagesList>

      <InputWrapper>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {replyingTo && (
          <ReplyBanner>
            <div>Respondendo para <strong>@{replyingTo.user.username}</strong></div>
            <button onClick={() => setReplyingTo(null)}><XCircle size={16} fill="#949BA4" color="#2B2D31" /></button>
          </ReplyBanner>
        )}

        {(isUploading || selectedFile) && (
          <UploadsContainer>
            {isUploading && (
              <UploadProgressCard>
                <div className="file-icon-wrapper">
                  {uploadingFileName.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i) ? (
                    <FileAudio size={18} />
                  ) : (
                    <File size={18} />
                  )}
                </div>
                <div className="progress-details">
                  <div className="info-row">
                    <span className="filename" title={uploadingFileName}>
                      {uploadingFileName}
                    </span>
                    <span className="separator"> — </span>
                    <span className="filesize">
                      {(uploadingFileSize / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
                <button
                  className="cancel-button"
                  title="Cancelar envio"
                  onClick={handleCancelUpload}
                >
                  <X size={16} />
                </button>
              </UploadProgressCard>
            )}

            {!isUploading && selectedFile && (
              <UploadPreviewCard>
                <div className="card-body">
                   {selectedFile.name && selectedFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                    <img
                      src={selectedFile.url.startsWith('http') ? selectedFile.url : `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${selectedFile.url}`}
                      alt={selectedFile.name}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="file-icon-placeholder">
                      <File size={24} />
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <span className="filename" title={selectedFile.name}>{selectedFile.name}</span>
                  <span className="filesize">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
                <div className="card-actions">
                  <button title="Ver original" onClick={() => window.open(selectedFile.url.startsWith('http') ? selectedFile.url : `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${selectedFile.url}`, '_blank')}>
                    <Eye size={16} />
                  </button>
                  <button className="delete-btn" title="Remover anexo" onClick={() => setSelectedFile(null)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </UploadPreviewCard>
            )}
          </UploadsContainer>
        )}

        {showGifPicker && (
          <GifPickerContainer ref={gifPickerRef}>
            <GifPickerHeader>
              <GifPickerTab
                $active={gifActiveTab === 'gifs'}
                onClick={() => setGifActiveTab('gifs')}
              >
                GIFs
              </GifPickerTab>
              <GifPickerTab
                $active={gifActiveTab === 'figurinha'}
                onClick={() => setGifActiveTab('figurinha')}
              >
                Figurinhas
              </GifPickerTab>
              <GifPickerTab
                $active={gifActiveTab === 'emoji'}
                onClick={() => setGifActiveTab('emoji')}
              >
                Emojis
              </GifPickerTab>
            </GifPickerHeader>

            <GifPickerSearchWrapper>
              {gifSearchQuery && (
                <button
                  className="back-button"
                  onClick={() => setGifSearchQuery('')}
                  title="Voltar"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} className="search-icon" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#949ba4' }} />
                <GifPickerSearchInput
                  type="text"
                  placeholder={gifActiveTab === 'gifs' ? 'Buscar Gifs' : gifActiveTab === 'figurinha' ? 'Buscar Figurinhas' : 'Buscar Emojis'}
                  value={gifSearchQuery}
                  onChange={(e) => setGifSearchQuery(e.target.value)}
                />
              </div>
            </GifPickerSearchWrapper>

            <GifPickerContent>
              {gifActiveTab !== 'gifs' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#949ba4', textAlign: 'center', padding: '0 20px', gap: '12px' }}>
                  <Smile size={48} color="#4e5058" />
                  <div style={{ fontSize: '13px' }}>
                    {gifActiveTab === 'figurinha' ? 'Nenhuma figurinha disponível no momento.' : 'Use o ícone de Smile à direita para abrir o seletor completo de emojis!'}
                  </div>
                </div>
              ) : isGifsLoading ? (
                <GifPickerLoading>
                  <Loader2 className="animate-spin" size={24} style={{ animation: 'spin 1s infinite linear' }} />
                </GifPickerLoading>
              ) : gifSearchQuery ? (
                gifResults.length > 0 ? (
                  <GifResultGrid>
                    {gifResults.map((url, index) => (
                      <GifItemImage
                        key={index}
                        src={url}
                        alt="GIF Result"
                        referrerPolicy="no-referrer"
                        onClick={() => handleSendGif(url)}
                      />
                    ))}
                  </GifResultGrid>
                ) : (
                  <div style={{ textAlign: 'center', color: '#949ba4', padding: '24px 0' }}>
                    Nenhum GIF encontrado
                  </div>
                )
              ) : (
                <GifCategoryGrid>
                  {GIF_CATEGORIES.map((category) => (
                    <GifCategoryCard
                      key={category.name}
                      onClick={() => setGifSearchQuery(category.name)}
                    >
                      <img src={category.bgUrl} alt={category.name} referrerPolicy="no-referrer" />
                      <span>{category.name}</span>
                    </GifCategoryCard>
                  ))}
                </GifCategoryGrid>
              )}
            </GifPickerContent>
          </GifPickerContainer>
        )}

        <InputContainer style={{
          borderTopLeftRadius: (replyingTo || selectedFile || isUploading) ? '0' : '8px',
          borderTopRightRadius: (replyingTo || selectedFile || isUploading) ? '0' : '8px'
        }}>
          <button className="add-btn" onClick={(e) => { e.preventDefault(); fileInputRef.current?.click(); }}>
            <PlusCircle size={24} />
          </button>
          <input
            id="chat-input"
            type="text"
            placeholder={`Conversar em #${activeChannel.name}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <RightIcons>
            <button><Gift size={24} /></button>
            <GifButton
              type="button"
              className={showGifPicker ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setShowGifPicker(!showGifPicker); }}
            >
              <div className="gif-label">GIF</div>
            </GifButton>
            <button><Sticker size={24} /></button>
            <button><Smile size={24} /></button>
          </RightIcons>
        </InputContainer>
      </InputWrapper>

      {contextMenu && (
        <ContextMenuWrapper $top={contextMenu.y} $left={contextMenu.x} onClick={(e) => e.stopPropagation()}>
          <ContextMenuItem className="reaction-menu">
            Adicionar reação <SmilePlus size={16} />

            {/* O SUBMENU DE REAÇÕES */}
            <QuickReactionsBox>
              <div className="emoji-list">
                {quickEmojis.map(emoji => (
                  <button key={emoji} onClick={() => { toggleReaction(contextMenu.message.id, emoji); setContextMenu(null); }}>
                    {emoji}
                  </button>
                ))}
              </div>
              <button className="view-more" onClick={() => { setShowEmojiPicker(contextMenu.message.id); setContextMenu(null); }}>
                Ver mais <SmilePlus size={14} />
              </button>
            </QuickReactionsBox>
          </ContextMenuItem>

          <ContextMenuDivider />

          <ContextMenuItem onClick={handleReplyClick}>Responder <Reply size={16} /></ContextMenuItem>
          <ContextMenuItem onClick={() => { navigator.clipboard.writeText(contextMenu.message.content); setContextMenu(null); }}>
            Copiar texto <Copy size={16} />
          </ContextMenuItem>

          {currentUser?.id === contextMenu.message.user.id && (
            <>
              <ContextMenuDivider />
              <ContextMenuItem onClick={startEditing}>Editar mensagem <Edit2 size={16} /></ContextMenuItem>
              <ContextMenuItem $danger onClick={handleDeleteClick}>Excluir mensagem <Trash2 size={16} /></ContextMenuItem>
            </>
          )}
        </ContextMenuWrapper>
      )}

      {/* Modal do Emoji Picker Completo */}
      {showEmojiPicker && (
        <ModalOverlay onClick={() => setShowEmojiPicker(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <EmojiPicker
              theme={Theme.DARK}
              onEmojiClick={(emojiData) => {
                toggleReaction(showEmojiPicker, emojiData.emoji);
                setShowEmojiPicker(null);
              }}
            />
          </div>
        </ModalOverlay>
      )}

      {messageToDelete && (
        <ModalOverlay onClick={() => setMessageToDelete(null)}>
          {/* Modal de excluir mensagem continua igual */}
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Excluir mensagem</h2>
              <button onClick={() => setMessageToDelete(null)}><X size={24} /></button>
            </ModalHeader>
            <ModalContent>
              <p>Deseja mesmo excluir essa mensagem?</p>
              <MessagePreviewBox>
                <Avatar style={{ backgroundColor: '#5865F2', width: '32px', height: '32px', fontSize: '14px', marginRight: '12px' }}>
                  {messageToDelete.user.username.charAt(0).toUpperCase()}
                </Avatar>
                <MessageContent>
                  <MessageHeader>
                    <strong>{messageToDelete.user.username}</strong>
                    <span>{new Date(messageToDelete.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </MessageHeader>
                  <Text>{messageToDelete.content}</Text>
                </MessageContent>
              </MessagePreviewBox>
              <ModalTip>
                <strong>FICA A DICA:</strong> Você pode pressionar <span>Shift</span> enquanto clica em <strong>excluir mensagem</strong> para ignorar a confirmação completamente.
              </ModalTip>
            </ModalContent>
            <ModalFooter>
              <button className="cancel" onClick={() => setMessageToDelete(null)}>Cancelar</button>
              <button className="delete" onClick={confirmDelete}>Excluir</button>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}

      {activeLightboxImage && (
        <LightboxOverlay onClick={() => setActiveLightboxImage(null)}>
          <LightboxToolbar onClick={(e) => e.stopPropagation()}>
            <LightboxActionGroup>
              <button
                title="Salvar imagem"
                onClick={async () => {
                  try {
                    const response = await fetch(activeLightboxImage.url);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = activeLightboxImage.name || 'imagem';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  } catch (err) {
                    window.open(activeLightboxImage.url, '_blank');
                  }
                }}
              >
                <Download size={18} />
              </button>
              <a
                href={activeLightboxImage.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir no navegador"
              >
                <ExternalLink size={18} />
              </a>
            </LightboxActionGroup>
            <LightboxCloseButton
              title="Fechar"
              onClick={() => setActiveLightboxImage(null)}
            >
              <X size={18} />
            </LightboxCloseButton>
          </LightboxToolbar>

          <LightboxContent onClick={(e) => e.stopPropagation()}>
            <img src={activeLightboxImage.url} alt={activeLightboxImage.name} referrerPolicy="no-referrer" />
          </LightboxContent>
        </LightboxOverlay>
      )}
    </Container>
  );
}