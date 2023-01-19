import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {AllCurrenciesProvider} from './state/AllCurrenciesContext'
import { SelectedCurrenciesProvider } from './state/SelectedCurrenciesContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>         
      <AllCurrenciesProvider>        
        <SelectedCurrenciesProvider>        
          <App />
        </SelectedCurrenciesProvider>
      </AllCurrenciesProvider>
  </React.StrictMode>
);

