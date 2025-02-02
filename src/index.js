import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BudgetsProvider } from './contexts/BudgetsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  </React.StrictMode>
);

