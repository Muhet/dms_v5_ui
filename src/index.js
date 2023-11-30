import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from "./redux/store/Store";
import { DrawerProvider } from './components/DrawerContext'; // Import the DrawerProvider
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <DrawerProvider> 
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </DrawerProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
