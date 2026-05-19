import { Container, ServerButton, Separator } from './styles';
import { useChat } from '../../contexts/ChatContext';
import { Globe } from 'lucide-react'; // Trocamos o ícone para um Globo

export function ServerList() {
  const { globalServer } = useChat();

  return (
    <Container>
      <ServerButton $isHome $isActive>
        <Globe size={28} />
      </ServerButton>

      <Separator />
    </Container>
  );
}