import styled from 'styled-components';

export const Container = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  max-height: 100vh;
  overflow-y: scroll;

  /* Remove a barra de rolagem no Firefox */
  scrollbar-width: none; 
  
  /* Remove a barra de rolagem no Chrome/Edge/Safari */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Separator = styled.div`
  width: 32px;
  border-bottom: 2px solid #35363C;
  margin-bottom: 8px;
`;

export const ServerButton = styled.button<{ $isHome?: boolean; $isActive?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 48px;
  height: 48px;
  border-radius: ${(props) => (props.$isActive ? '16px' : '24px')}; /* 24px é 50% de 48, círculo perfeito */
  background-color: ${(props) => (props.$isHome ? '#5865F2' : '#313338')};
  color: ${(props) => (props.$isActive ? '#ffffff' : '#DBDEE1')};
  margin-bottom: 8px;
  transition: all 0.2s ease-out;

  font-size: 16px;
  font-weight: 500;

  /* O marcador branco (pílula) do lado esquerdo */
  &::before {
    content: '';
    position: absolute;
    left: -12px; /* Joga a pílula exatamente para a borda da tela */
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: ${(props) => (props.$isActive ? '40px' : '0px')};
    background-color: white;
    border-radius: 0 4px 4px 0;
    transition: height 0.2s ease-out;
  }

  /* Efeito ao passar o mouse */
  &:hover {
    border-radius: 16px; /* Fica quadrado arredondado */
    background-color: ${(props) => (props.$isHome ? '#5865F2' : '#5865F2')};
    color: white;

    &::before {
      /* Se não estiver ativo, a pílula aparece pequenininha no hover */
      height: ${(props) => (props.$isActive ? '40px' : '20px')};
    }
  }
`;