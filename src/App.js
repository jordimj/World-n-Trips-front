import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { AppRouter } from './routes/AppRouter';
import { store } from './store/store';
import theme from './styles/theme';
import './styles/index.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
