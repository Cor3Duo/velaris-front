import styled from 'styled-components';

export const Container = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  background-color: #2B2D31;
  height: 100vh;
`;

/* 1. TOPO DA BARRA */
export const SearchContainer = styled.div`
  height: 48px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  z-index: 2;

  button {
    width: 100%;
    height: 28px;
    background-color: #1E1F22;
    color: #949BA4;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    text-align: left;
    padding: 0 6px;
    display: flex;
    align-items: center;
  }
`;

/* 2. ÁREA DE SCROLL (Amigos e DMs) */
export const ScrollArea = styled.div`
  flex: 1; /* Ocupa todo o espaço restante */
  overflow-y: auto;
  padding: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1A1B1E;
    border-radius: 4px;
  }
`;

export const MenuItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 4px;
  color: ${(props) => (props.$active ? '#FFFFFF' : '#949BA4')};
  background-color: ${(props) => (props.$active ? '#404249' : 'transparent')};
  cursor: pointer;
  margin-bottom: 2px;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$active ? '#404249' : '#35373C')};
    color: #DBDEE1;
  }

  span {
    margin-left: 12px;
    font-size: 15px;
    font-weight: 500;
  }
`;

export const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 8px 4px 12px;
  color: #949BA4;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;

  svg {
    cursor: pointer;
    &:hover {
      color: #DBDEE1;
    }
  }
`;

export const DMItem = styled(MenuItem)`
  padding: 6px 8px;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #5865F2; /* Cor base caso não tenha imagem */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

export const StatusIndicator = styled.div<{ $status: 'online' | 'offline' | 'dnd' }>`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  background-color: ${(props) =>
    props.$status === 'online' ? '#23A559' :
      props.$status === 'dnd' ? '#F23F42' : '#80848E'};
  border-radius: 50%;
  border: 3px solid #2B2D31; /* Borda da cor do fundo para dar o recorte */
`;

/* 3. RODAPÉ (Perfil de Usuário) */
export const UserProfile = styled.div`
  height: 52px;
  background-color: #232428;
  display: flex;
  align-items: center;
  padding: 0 8px;
  justify-content: space-between;
  flex-shrink: 0;
`;

export const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    background-color: #313338;
  }

  div {
    display: flex;
    flex-direction: column;
    
    strong {
      color: #F2F3F5;
      font-size: 13px;
      line-height: 16px;
    }
    span {
      color: #B5BAC1;
      font-size: 11px;
    }
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  
  button {
    color: #B5BAC1;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #313338;
      color: #DBDEE1;
    }
  }
`;