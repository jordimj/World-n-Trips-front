import { ThemeProvider } from '@mui/material';
import { AppRouter } from './routes/AppRouter';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
