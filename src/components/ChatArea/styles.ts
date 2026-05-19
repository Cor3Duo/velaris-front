import styled, { keyframes } from 'styled-components';

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

/* 4. SKELETON LOADING */
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const SkeletonRow = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 8px 16px;
  margin-top: 16px;
`;

export const SkeletonAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
  flex-shrink: 0;
  background: linear-gradient(90deg, #2E3035 25%, #35373C 50%, #2E3035 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

export const SkeletonTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  padding-top: 4px;
`;

export const SkeletonHeader = styled.div`
  height: 12px;
  width: 120px;
  border-radius: 4px;
  background: linear-gradient(90deg, #2E3035 25%, #35373C 50%, #2E3035 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

export const SkeletonText = styled.div<{ $width?: string }>`
  height: 15px;
  width: ${props => props.$width || '70%'};
  border-radius: 4px;
  background: linear-gradient(90deg, #2E3035 25%, #35373C 50%, #2E3035 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

export const LoadingMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  color: #949BA4;
  font-size: 14px;

  svg {
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const AttachmentImage = styled.img`
  max-width: 550px;
  max-height: 350px;
  width: auto;
  height: auto;
  border-radius: 8px;
  margin-top: 8px;
  cursor: pointer;
  display: block;
  align-self: flex-start;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const AttachmentCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #2F3136;
  border: 1px solid #202225;
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;
  max-width: 450px;
  width: 100%;

  .file-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 48px;
    background-color: #36393F;
    border-radius: 4px;
    color: #B5BAC1;
    flex-shrink: 0;
  }

  .file-details {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    a {
      color: #00AFF4;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        text-decoration: underline;
      }
    }

    span {
      color: #72767D;
      font-size: 12px;
      margin-top: 4px;
    }
  }
`;

export const UploadsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  background-color: #2B2D31;
  border-bottom: 1px solid #1F2023;
  padding: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const UploadPreviewCard = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  background-color: #2B2D31;
  border: 1px solid #1F2023;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  box-sizing: border-box;

  .card-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #232428;
    border-radius: 4px;
    margin-bottom: 8px;
    overflow: hidden;
    position: relative;
    width: 100%;
    
    img {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid #4E5058;
    }

    .file-icon-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background-color: #35373C;
      border-radius: 6px;
      color: #B5BAC1;
    }
  }

  .card-footer {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-align: left;

    .filename {
      color: #F2F3F5;
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .filesize {
      color: #949BA4;
      font-size: 11px;
      margin-top: 2px;
    }
  }

  .card-actions {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    background-color: #111214;
    border-radius: 4px;
    padding: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 10;
    gap: 2px;

    button {
      background: none;
      border: none;
      color: #B5BAC1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: 3px;
      transition: background-color 0.2s, color 0.2s;

      &:hover {
        background-color: #35373C;
        color: #F2F3F5;
      }

      &.delete-btn:hover {
        color: #FA777C;
      }
    }
  }
`;

export const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const LightboxContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 85vw;
  max-height: 85vh;

  img {
    max-width: 80vw;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    user-select: none;
  }
`;

export const LightboxToolbar = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10000;
`;

export const LightboxActionGroup = styled.div`
  background-color: #111214;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  height: 36px;
  box-sizing: border-box;

  a, button {
    background: none;
    border: none;
    color: #B5BAC1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    transition: background-color 0.2s, color 0.2s;
    text-decoration: none;

    &:hover {
      background-color: #35373C;
      color: #F2F3F5;
    }
  }
`;

export const LightboxCloseButton = styled.button`
  background-color: #111214;
  border: none;
  color: #B5BAC1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #35373C;
    color: #F2F3F5;
  }
`;

export const AudioCard = styled.div`
  background-color: #2b2d31;
  border: 1px solid #202225;
  border-radius: 8px;
  padding: 12px;
  width: 450px;
  max-width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
`;

export const AudioHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .audio-icon-wrapper {
    background-color: #313338;
    color: #5865f2;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .audio-info {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    a {
      color: #00a8fc;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      &:hover {
        text-decoration: underline;
      }
    }

    span {
      color: #949ba4;
      font-size: 12px;
      margin-top: 2px;
    }
  }
`;

export const AudioControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #111214;
  border-radius: 4px;
  padding: 8px 12px;
  height: 48px;
  box-sizing: border-box;

  button {
    background: none;
    border: none;
    color: #dbdee1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: color 0.2s;
    flex-shrink: 0;

    &:hover {
      color: #f2f3f5;
    }
  }

  .time-display {
    color: #949ba4;
    font-size: 12px;
    font-family: monospace;
    min-width: 80px;
    user-select: none;
    flex-shrink: 0;
  }

  .progress-slider {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: #4e5058;
    outline: none;
    -webkit-appearance: none;
    cursor: pointer;

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
    }

    &::-webkit-slider-thumb {
      height: 12px;
      width: 12px;
      border-radius: 50%;
      background: #5865f2;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -4px;
    }
  }
`;

export const UploadProgressCard = styled.div`
  background-color: #2b2d31;
  border: 1px solid #202225;
  border-radius: 8px;
  padding: 10px 14px;
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  box-sizing: border-box;

  .file-icon-wrapper {
    background-color: #313338;
    color: #5865f2;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .progress-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow: hidden;

    .info-row {
      display: flex;
      align-items: center;
      color: #f2f3f5;
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      .filename {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .separator {
        margin: 0 4px;
        color: #949ba4;
      }

      .filesize {
        color: #949ba4;
        font-weight: 400;
      }
    }

    .progress-bar-track {
      width: 100%;
      height: 4px;
      background-color: #4e5058;
      border-radius: 2px;
      overflow: hidden;
      position: relative;

      .progress-bar-fill {
        height: 100%;
        background-color: #5865f2;
        transition: width 0.1s linear;
      }
    }
  }

  .cancel-button {
    background: none;
    border: none;
    color: #949ba4;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 50%;
    transition: color 0.2s, background-color 0.2s;
    flex-shrink: 0;

    &:hover {
      color: #f2f3f5;
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
`;