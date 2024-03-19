import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import '@progress/kendo-theme-default/dist/all.css';
import { TransactionsProvider } from 'contexts/TransactionsContext';
import App from 'App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionsProvider>
    <App />
  </TransactionsProvider>
);
