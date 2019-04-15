import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers/rootReducer';
import App from './App';
import './assets/sass/main.scss';

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
