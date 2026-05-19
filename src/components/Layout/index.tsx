import { Grid } from './styles';
import { ServerList } from '../ServerList';
import { ChannelList } from '../ChannelList';
import { ChatArea } from '../ChatArea';
import { MemberList } from '../MemberList';
import { WelcomeModal } from '../WelcomeModal';
import { useChat } from '../../contexts/ChatContext';

export function Layout() {
  const { currentUser } = useChat();

  if (!currentUser) {
    return <WelcomeModal />;
  }

  return (
    <Grid>
      <ServerList />
      <ChannelList />
      <ChatArea />
      <MemberList />
    </Grid>
  );
}