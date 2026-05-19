import { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { Overlay, Modal, LogoContainer, Title, Form, InputGroup, Input, Button, Subtitle } from './styles';

export function WelcomeModal() {
  const { connectAsGuest, isLoading } = useChat();
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      connectAsGuest(username.trim());
    }
  };

  return (
    <Overlay>
      <Modal>
        <LogoContainer>
          <img src="https://cdn-icons-png.flaticon.com/512/618/618303.png" alt="Logo" />
        </LogoContainer>

        <Title>Bem-vindo à Comunidade!</Title>
        <Subtitle>Estamos muito felizes em ver você aqui!</Subtitle>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label>COMO DEVEMOS TE CHAMAR?</label>
            <Input
              autoFocus
              type="text"
              required
              maxLength={32}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite um apelido legal"
            />
          </InputGroup>

          <Button type="submit" disabled={!username.trim() || isLoading}>
            {isLoading ? 'Conectando...' : 'Continuar'}
          </Button>
        </Form>
      </Modal>
    </Overlay>
  );
}