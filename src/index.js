import { createRoot } from 'react-dom/client';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App />);

registerServiceWorker();
