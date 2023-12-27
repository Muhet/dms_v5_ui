import React from 'react';
import { createRoot } from 'react-dom/client';  // Import createRoot from "react-dom/client" instead of "react-dom"
import { Provider } from 'react-redux';
import store from "./redux/store/Store";
import { DrawerProvider } from './components/DrawerContext';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <DrawerProvider> 
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </DrawerProvider>
  </Provider>
);

reportWebVitals();
