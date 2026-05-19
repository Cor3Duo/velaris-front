import { GlobalStyles } from './styles/GlobalStyles';
import { Layout } from './components/Layout';
import { ChatProvider } from './contexts/ChatContext';

function App() {
  return (
    <ChatProvider>
      <GlobalStyles />
      <Layout />
    </ChatProvider>
  );
}

export default App;