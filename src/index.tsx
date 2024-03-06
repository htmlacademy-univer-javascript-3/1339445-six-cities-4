import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const placeCardNumber = 5;

root.render(
  <React.StrictMode>
    <App placeCardNumber={placeCardNumber}/>
  </React.StrictMode>
);
