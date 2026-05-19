// src/components/ChannelList/index.tsx

import { Plus, Mic, Headphones, Settings, Hash } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import {
  Container, SearchContainer, ScrollArea, MenuItem, CategoryTitle,
  AvatarWrapper, StatusIndicator, UserProfile, UserData, IconsWrapper
} from './styles';

export function ChannelList() {
  const { currentUser, globalServer, activeChannelId, changeChannel } = useChat();

  if (!currentUser || !globalServer) return null;

  return (
    <Container>
      <SearchContainer>
        <button>{globalServer.name}</button>
      </SearchContainer>

      <ScrollArea>
        <CategoryTitle>
          <span>Canais de Texto</span>
          <Plus size={16} />
        </CategoryTitle>

        {globalServer.channels.map(channel => (
          <MenuItem
            key={channel.id}
            $active={activeChannelId === channel.id}
            onClick={() => changeChannel(channel.id)}
          >
            <Hash size={20} color="#949BA4" />
            <span>{channel.name}</span>
          </MenuItem>
        ))}
      </ScrollArea>

      <UserProfile>
        <UserData>
          <AvatarWrapper>
            {currentUser.username.charAt(0).toUpperCase()}
            <StatusIndicator $status="online" />
          </AvatarWrapper>
          <div>
            <strong>{currentUser.username}</strong>
            <span>Online</span>
          </div>
        </UserData>

        <IconsWrapper>
          <button><Mic size={18} /></button>
          <button><Headphones size={18} /></button>
          <button><Settings size={18} /></button>
        </IconsWrapper>
      </UserProfile>
    </Container>
  );
}