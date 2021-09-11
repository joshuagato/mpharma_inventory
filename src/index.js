import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import { reducer as notifications } from 'react-notification-system-redux';
import { productsReducer, archivedProductsReducer } from '../src/store/reducers';

axios.defaults.baseURL = 'http://www.mocky.io/v2/5c3e15e63500006e003e9795';

const rootReducer = combineReducers({
    productsReducer,
    archivedProductsReducer,
    notifications
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
