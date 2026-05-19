import styled from 'styled-components';

export const Container = styled.div`
  grid-column: 4;
  background-color: #2B2D31;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
  padding: 24px 8px 8px 16px;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1E1F22;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const Role = styled.span`
  margin-top: 20px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  color: #949BA4;
  letter-spacing: 0.02em;

  &:first-child {
    margin-top: 0;
  }
`;

export const UserRow = styled.div`
  margin-top: 6px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background: transparent;
  transition: background 0.15s ease, color 0.15s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(78, 80, 88, 0.3);
    
    strong {
      color: #F2F3F5;
    }
  }

  strong {
    margin-left: 12px;
    font-weight: 500;
    font-size: 15px;
    color: #949BA4;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #313338;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.div<{ $imageUrl?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #5865F2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #FFFFFF;
  font-size: 14px;
  background-image: ${props => props.$imageUrl ? `url(${props.$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
`;

export const StatusBadge = styled.div<{ $status: 'online' | 'offline' }>`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 3px solid #2B2D31;
  background-color: ${props => props.$status === 'online' ? '#23A55A' : '#80848E'};
`;
