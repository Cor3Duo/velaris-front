import styled from 'styled-components';

export const Container = styled.div`
  grid-column: 3;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #313338;
`;

/* 1. CABEÇALHO */
export const Header = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #26282C;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  z-index: 2;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  strong {
    color: #F2F3F5;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  button {
    color: #B5BAC1;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #DBDEE1;
    }
  }
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #1E1F22;
  border-radius: 4px;
  padding: 0 6px;
  width: 144px;
  height: 24px;
  transition: width 0.2s ease;

  &:focus-within {
    width: 240px;
  }

  input {
    background: transparent;
    border: none;
    outline: none;
    color: #DBDEE1;
    font-size: 14px;
    width: 100%;

    &::placeholder {
      color: #949BA4;
    }
  }

  svg {
    color: #949BA4;
  }
`;

/* 2. ÁREA DE MENSAGENS */
export const MessagesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1A1B1E;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #2B2D31;
  }
`;

export const MessageItem = styled.div<{ $isGrouped?: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: 2px 16px;
  margin-top: ${(props) => (props.$isGrouped ? '0' : '16px')};

  &:hover {
    background-color: #2E3035;

    /* Quando passa o mouse, mostra a hora na mensagem agrupada */
    .grouped-time {
      display: inline-block;
    }
  }
`;

export const AvatarContainer = styled.div<{ $isGrouped?: boolean }>`
  width: 40px;
  margin-right: 16px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: ${(props) => (props.$isGrouped ? '2px' : '0')};

  /* Estilo da hora que aparece ao passar o mouse */
  .grouped-time {
    display: none;
    font-size: 11px;
    color: #949BA4;
    user-select: none;
  }
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MessageHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;

  strong {
    color: #F2F3F5;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: #949BA4;
    font-size: 12px;
  }
`;

export const Text = styled.div`
  color: #DBDEE1;
  font-size: 15px;
  line-height: 22px;
`;

/* 3. CAIXA DE INPUT */
export const InputWrapper = styled.div`
  padding: 0 16px 24px 16px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #383A40;
  border-radius: 8px;
  padding: 0 16px;
  height: 44px;

  .add-btn {
    color: #B5BAC1;
    margin-right: 16px;
    display: flex;

    &:hover {
      color: #DBDEE1;
    }
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #DBDEE1;
    font-size: 15px;

    &::placeholder {
      color: #949BA4;
    }
  }
`;

export const RightIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  button {
    color: #B5BAC1;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #DBDEE1;
    }
  }
`;

export const ContextMenuWrapper = styled.div<{ $top: number; $left: number }>`
  position: fixed;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  background-color: #111214;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
  padding: 6px 8px;
  min-width: 220px;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

export const ReactionBadge = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${(props) => (props.$active ? '#5865F233' : '#2B2D31')};
  border: 1px solid ${(props) => (props.$active ? '#5865F2' : 'transparent')};
  padding: 2px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: .1s;

  font-size: 14px;
  
  span {
    color: ${(props) => (props.$active ? '#F2F3F5' : '#B5BAC1')};
    font-size: 12px;
    font-weight: bold;
  }

  &:hover {
    background-color: ${(props) => (props.$active ? '#5865F24D' : '#35373C')};
    border-color: ${(props) => (props.$active ? '#5865F2' : '#4E5058')};
  }
`;

export const QuickReactionsBox = styled.div`
  display: none;
  position: absolute;
  top: 0;
  right: -230px;
  background-color: #111214;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.24);
  padding: 8px;
  width: 220px;
  flex-direction: column;
  gap: 8px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -20px; /* Puxa para a esquerda para cobrir o vão */
    width: 20px; /* A largura cobre a distância até o menu principal */
    height: 100%;
    background-color: transparent; /* Mantém invisível */
  }

  .emoji-list {
    display: flex;
    justify-content: space-between;

    button {
      font-size: 20px;
      padding: 4px;
      border-radius: 4px;
      transition: .2s;
      
      &:hover {
        background-color: #2B2D31;
        transform: scale(1.1);
      }
    }
  }

  .view-more {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 8px;
    color: #B5BAC1;
    font-size: 13px;
    font-weight: 500;
    border-radius: 4px;
    background-color: #2B2D31;

    &:hover {
      background-color: #35373C;
      color: #DBDEE1;
    }
  }
`;

export const ContextMenuItem = styled.div<{ $danger?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 2px;
  color: ${(props) => (props.$danger ? '#DA373C' : '#B5BAC1')};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 2px;

  &:hover {
    background-color: ${(props) => (props.$danger ? '#DA373C' : '#5865F2')};
    color: #FFFFFF;
  }

  &:hover.reaction-menu > ${QuickReactionsBox} {
    display: flex;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ContextMenuDivider = styled.div`
  height: 1px;
  background-color: #2B2D31;
  margin: 4px 0;
`;

export const EditMessageContainer = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const EditInput = styled.input`
  width: 100%;
  background-color: #2B2D31;
  border: none;
  border-radius: 8px;
  padding: 12px 14px;
  color: #DBDEE1;
  font-size: 15px;
  outline: none;

  &:focus {
    background-color: #383A40;
  }
`;

export const EditHelper = styled.div`
  font-size: 12px;
  color: #B5BAC1;
  margin-top: 6px;

  span {
    color: #00AFF4;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0; /* Ocupa a tela toda (top, left, right, bottom 0) */
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: #313338;
  width: 440px;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.24);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Para o footer com cor diferente não vazar das bordas */
`;

export const ModalHeader = styled.div`
  padding: 24px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: #F2F3F5;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }

  button {
    color: #B5BAC1;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover { color: #DBDEE1; }
  }
`;

export const ModalContent = styled.div`
  padding: 0 16px 24px;
  
  > p {
    color: #DBDEE1;
    font-size: 15px;
    margin-bottom: 16px;
  }
`;

export const MessagePreviewBox = styled.div`
  border: 1px solid #4E5058;
  border-radius: 4px;
  padding: 12px 16px 12px 12px;
  display: flex;
  background-color: #2B2D31;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  /* Reaproveitamos o estilo de Text para não ficar gigante */
  ${Text} {
    font-size: 14px; 
  }
`;

export const ModalTip = styled.div`
  font-size: 12px;
  color: #B5BAC1;
  line-height: 16px;

  strong {
    color: #23A559; /* Verde do "FICA A DICA" */
    font-weight: 700;
  }

  span {
    color: #F2F3F5;
    font-weight: 500;
  }
`;

export const ModalFooter = styled.div`
  background-color: #2B2D31;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  button {
    padding: 10px 24px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .cancel {
    color: #FFFFFF;
    &:hover { text-decoration: underline; }
  }

  .delete {
    background-color: #DA373C;
    color: #FFFFFF;
    &:hover { background-color: #B5282C; }
  }
`;

export const ReplyBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2B2D31;
  padding: 8px 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: #B5BAC1;
  font-size: 14px;
  
  strong {
    color: #F2F3F5;
    margin-left: 4px;
  }

  button {
    color: #B5BAC1;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover { color: #DBDEE1; }
  }
`;

/* Container da mensagem que foi respondida (linha torta) */
export const RepliedMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  position: relative;
  color: #B5BAC1;
  font-size: 14px;
  cursor: pointer;

  &:hover { color: #DBDEE1; }

  &::before {
    content: '';
    position: absolute;
    left: -32px; /* Joga a linha para a esquerda, abaixo do Avatar */
    top: 50%; /* Metade da altura dessa linha pequena */
    width: 28px;
    height: 12px;
    border-top: 2px solid #4E5058;
    border-left: 2px solid #4E5058;
    border-top-left-radius: 6px;
    transform: translateY(-100%); /* Puxa para cima para fazer a curva */
  }

  img, .tiny-avatar {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 4px;
    background-color: #5865F2;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 10px;
    font-weight: bold;
  }

  strong {
    color: #DBDEE1;
    font-weight: 500;
    margin-right: 4px;
  }

  .reply-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60%;
  }
`;