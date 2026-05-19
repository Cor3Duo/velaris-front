import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
    width: 100vw; /* Garante que ocupa 100% da largura da janela */
    background-color: #313338;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    overflow: hidden; /* Evita qualquer rolagem indesejada na tela inteira */
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  a {
    text-decoration: none;
  }
`;