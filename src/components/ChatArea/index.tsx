import { useState, useRef, useEffect } from 'react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import {
  Hash, Search, Inbox, HelpCircle, PlusCircle, Gift, Sticker, Smile,
  Reply, Edit2, Trash2, Copy, X,
  XCircle,
  SmilePlus
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
  QuickReactionsBox
} from './styles';

export function ChatArea() {
  const { currentUser, globalServer, activeChannelId, messages, sendMessage, deleteMessage, editMessage, toggleReaction } = useChat();
  const [inputValue, setInputValue] = useState('');

  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, message: Message } | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null); // Guarda o ID da mensagem
  const quickEmojis = ['👍', '🤣', '❤️', '🔥', '😭', '👀'];
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const activeChannel = globalServer?.channels.find(c => c.id === activeChannelId);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      sendMessage(inputValue, replyingTo?.id);
      setInputValue('');
      setReplyingTo(null);
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
    setEditingMessageId(contextMenu.message.id);
    setEditingContent(contextMenu.message.content);
    setContextMenu(null);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditingContent('');
  };

  const saveEditing = (msgId: string) => {
    if (editingContent.trim() !== '') editMessage(msgId, editingContent);
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

      <MessagesList>
        {messages.map((msg, index) => {
          const prevMsg = index > 0 ? messages[index - 1] : null;

          const isSameUser = prevMsg?.user.id === msg.user.id;

          const timeDiff = prevMsg ? new Date(msg.createdAt).getTime() - new Date(prevMsg.createdAt).getTime() : 0;
          const isWithin5Min = timeDiff < 5 * 60 * 1000;
          const isReply = !!msg.replyTo;

          const isGrouped = Boolean(isSameUser && isWithin5Min && !isReply);

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
                    <span className="reply-text">{msg.replyTo!.content}</span>
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
                  <Text>{msg.content}</Text>
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
        <div ref={messagesEndRef} />
      </MessagesList>

      <InputWrapper>
        {replyingTo && (
          <ReplyBanner>
            <div>Respondendo para <strong>@{replyingTo.user.username}</strong></div>
            <button onClick={() => setReplyingTo(null)}><XCircle size={16} fill="#949BA4" color="#2B2D31" /></button>
          </ReplyBanner>
        )}

        <InputContainer style={{ borderTopLeftRadius: replyingTo ? '0' : '8px', borderTopRightRadius: replyingTo ? '0' : '8px' }}>
          <button className="add-btn"><PlusCircle size={24} /></button>
          <input
            id="chat-input"
            type="text"
            placeholder={`Conversar em #${activeChannel.name}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <RightIcons>
            <button><Gift size={24} /></button><button><Sticker size={24} /></button><button><Smile size={24} /></button>
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
    </Container>
  );
}