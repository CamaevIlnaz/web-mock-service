import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';

import { App } from './app/App';

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element was not found');
}

createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
