// src/components/WelcomeModal/styles.ts

import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: #1E1F22;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  
  /* Background simulando a tela de login do Discord */
  background-image: url('https://theme.zdassets.com/theme_assets/678183/b7e9dce75f9edb23504e13b4699e208f28dacb29.jpg');
  background-size: cover;
  background-position: center;
`;

export const Modal = styled.div`
  background-color: #313338;
  width: 480px;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const LogoContainer = styled.div`
  margin-bottom: 24px;
  img {
    width: 60px;
    height: 60px;
  }
`;

export const Title = styled.h1`
  color: #F2F3F5;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  color: #B5BAC1;
  font-size: 15px;
  margin-bottom: 32px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  label {
    color: #B5BAC1;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

export const Input = styled.input`
  width: 100%;
  background-color: #1E1F22;
  border: none;
  border-radius: 4px;
  color: #DBDEE1;
  padding: 14px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    outline: 2px solid #5865F2;
  }
`;

export const Button = styled.button`
  background-color: #5865F2;
  color: white;
  width: 100%;
  padding: 14px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #4752C4;
  }

  &:disabled {
    background-color: #5865F2;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;