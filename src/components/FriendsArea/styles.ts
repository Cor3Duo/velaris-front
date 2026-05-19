import styled from 'styled-components';

export const Container = styled.div`
  grid-column: 3;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #313338;
`;

/* HEADER */
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

export const HeaderTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    strong { color: #F2F3F5; font-size: 16px; font-weight: 600; }
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 24px;
  background-color: #3F4147;
  margin: 0 8px;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  color: ${props => props.$active ? '#FFFFFF' : '#B5BAC1'};
  background-color: ${props => props.$active ? '#43B581' : 'transparent'};
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  transition: .2s;

  &.add-friend {
    color: ${props => props.$active ? '#FFFFFF' : '#23A559'};
    background-color: ${props => props.$active ? '#23A559' : 'transparent'};
  }

  &:hover:not(.add-friend) {
    background-color: #3F4147;
    color: #DBDEE1;
  }
`;

export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  button { color: #B5BAC1; display: flex; }
  button:hover { color: #DBDEE1; }
`;

/* CORPO */
export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

/* COLUNA CENTRAL */
export const MainColumn = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const InputSection = styled.div`
  h2 { color: #F2F3F5; font-size: 16px; margin-bottom: 8px; text-transform: uppercase; }
  p { color: #B5BAC1; font-size: 14px; margin-bottom: 16px; }
`;

export const AddFriendInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #1E1F22;
  border: 1px solid #1E1F22;
  border-radius: 8px;
  padding: 0 12px;
  height: 52px;
  transition: border .2s;

  &:focus-within { border-color: #5865F2; }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #DBDEE1;
    font-size: 16px;
  }

  button {
    background-color: #5865F2;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    transition: .2s;
    
    &:hover { background-color: #4752C4; }
  }
`;

export const ExploreSection = styled.div`
  border-top: 1px solid #3F4147;
  padding-top: 24px;

  h3 { color: #F2F3F5; font-size: 16px; margin-bottom: 8px; }
  p { color: #B5BAC1; font-size: 14px; margin-bottom: 16px; max-width: 500px; line-height: 1.4; }

  .explore-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #2B2D31;
    width: 100%;
    max-width: 400px;
    padding: 12px;
    border-radius: 8px;
    transition: background .2s;

    &:hover { background-color: #35373C; }

    .left {
      display: flex;
      align-items: center;
      gap: 12px;

      .icon-wrapper {
        width: 32px; height: 32px;
        background-color: #23A55933;
        border-radius: 8px;
        display: flex; align-items: center; justify-content: center;
      }

      span { color: #F2F3F5; font-size: 16px; font-weight: 500; }
    }
  }
`;