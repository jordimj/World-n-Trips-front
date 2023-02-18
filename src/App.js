import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes/AppRouter';
import { store } from './store/store';
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
