import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);

registerServiceWorker();
