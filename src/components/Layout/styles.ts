import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  
  /* 72px (Servidores), 240px (Canais), auto (Chat) */
  grid-template-columns: 72px 240px auto; 
  grid-template-rows: 100vh;
  height: 100vh;

  > div:nth-child(1) { background-color: #1E1F22; } /* Barra de Servidores */
  > div:nth-child(2) { background-color: #2B2D31; } /* Barra de Canais */
  > div:nth-child(3) { background-color: #313338; } /* Área do Chat */
`;