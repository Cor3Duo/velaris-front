import { Container, ServerButton, Separator } from './styles';
import { Globe } from 'lucide-react';

export function ServerList() {

  return (
    <Container>
      <ServerButton $isHome $isActive>
        <Globe size={28} />
      </ServerButton>

      <Separator />
    </Container>
  );
}