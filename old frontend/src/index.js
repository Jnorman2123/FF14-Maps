import React from 'react';
import ReactDOM from 'react-dom';
import App from '../pages';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureStore from '../redux/store';
import '../pages/App.scss';
import { HelmetProvider } from 'react-helmet-async';

const store = configureStore();
const helmetContext = {};

ReactDOM.hydrate(
  <HelmetProvider context={helmetContext}>
    <Provider store={store}>
      <App />
    </Provider>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
