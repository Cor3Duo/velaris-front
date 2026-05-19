import { Users, HelpCircle, Compass, ChevronRight } from 'lucide-react';
import {
  Container, Header, HeaderTabs, Tab, Divider, HeaderIcons,
  ContentWrapper, MainColumn, InputSection, AddFriendInput,
  ExploreSection
} from './styles';

export function FriendsArea() {
  return (
    <Container>
      {/* 1. CABEÇALHO */}
      <Header>
        <HeaderTabs>
          <div className="title">
            <Users size={24} color="#949BA4" />
            <strong>Amigos</strong>
          </div>
          <Divider />
          <Tab>Disponível</Tab>
          <Tab>Todos</Tab>
          <Tab>Pendente</Tab>
          <Tab $active className="add-friend">Adicionar amigo</Tab>
        </HeaderTabs>

        <HeaderIcons>
          <button><HelpCircle size={20} /></button>
        </HeaderIcons>
      </Header>

      <ContentWrapper>
        {/* 2. COLUNA CENTRAL (Adicionar amigo) */}
        <MainColumn>
          <InputSection>
            <h2>Adicionar amigo</h2>
            <p>Você pode adicionar amigos com o nome de usuário Velaris deles.</p>

            <AddFriendInput>
              <input type="text" placeholder="Insira um nome de usuário" />
              <button>Enviar pedido de amizade</button>
            </AddFriendInput>
          </InputSection>

          <ExploreSection>
            <h3>Outros lugares para fazer amigos</h3>
            <p>Ninguém vem à cabeça? Confira nossa lista de servidores públicos que tem todas as tribos, de jogos a culinária, música, anime e muito mais.</p>

            <button className="explore-btn">
              <div className="left">
                <div className="icon-wrapper">
                  <Compass size={24} color="#23A559" />
                </div>
                <span>Explorar Servidores Públicos</span>
              </div>
              <ChevronRight size={20} color="#949BA4" />
            </button>
          </ExploreSection>
        </MainColumn>
      </ContentWrapper>
    </Container>
  );
}