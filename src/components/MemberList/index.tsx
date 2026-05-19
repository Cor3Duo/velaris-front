import { useChat } from '../../contexts/ChatContext';
import { Container, Role, UserRow, AvatarWrapper, Avatar, StatusBadge } from './styles';

export function MemberList() {
  const { members, onlineUsers } = useChat();

  // Divide os membros entre online e offline.
  // Guests (usuários sem email) não aparecem se estiverem offline.
  const onlineMembers = members.filter(member => onlineUsers.has(member.user.id));
  const offlineMembers = members.filter(member => !onlineUsers.has(member.user.id) && !!member.user.email);

  // Ordena alfabeticamente
  const sortFn = (a: any, b: any) => a.user.username.localeCompare(b.user.username);
  onlineMembers.sort(sortFn);
  offlineMembers.sort(sortFn);

  return (
    <Container>
      <Role>Disponível — {onlineMembers.length}</Role>
      {onlineMembers.map(member => (
        <UserRow key={member.id}>
          <AvatarWrapper>
            <Avatar $imageUrl={member.user.imageUrl}>
              {!member.user.imageUrl && member.user.username[0].toUpperCase()}
            </Avatar>
            <StatusBadge $status="online" />
          </AvatarWrapper>
          <strong>{member.user.username}</strong>
        </UserRow>
      ))}

      {offlineMembers.length > 0 && (
        <>
          <Role>Offline — {offlineMembers.length}</Role>
          {offlineMembers.map(member => (
            <UserRow key={member.id} style={{ opacity: 0.6 }}>
              <AvatarWrapper>
                <Avatar $imageUrl={member.user.imageUrl} style={{ filter: 'grayscale(100%)' }}>
                  {!member.user.imageUrl && member.user.username[0].toUpperCase()}
                </Avatar>
                <StatusBadge $status="offline" />
              </AvatarWrapper>
              <strong>{member.user.username}</strong>
            </UserRow>
          ))}
        </>
      )}
    </Container>
  );
}
