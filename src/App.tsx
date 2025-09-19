import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';
import { AppRouter } from './routes/AppRouter';
import { store } from './store';
import theme from './styles/theme';
import './styles/index.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
