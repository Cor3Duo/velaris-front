// src/components/Layout/index.tsx

import { Grid } from './styles';
import { ServerList } from '../ServerList';
import { ChannelList } from '../ChannelList';
import { ChatArea } from '../ChatArea';
import { useChat } from '../../contexts/ChatContext';

export function Layout() {
  const { isLoading } = useChat();

  // Exibe uma mensagem simples enquanto o back-end gera o usuário
  if (isLoading) {
    return <div style={{ color: 'white', padding: '20px' }}>Conectando à Comunidade Global...</div>;
  }

  return (
    <Grid>
      <ServerList />
      <ChannelList />
      <ChatArea />
    </Grid>
  );
}