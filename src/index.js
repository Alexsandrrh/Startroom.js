import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootStore from './store';
import App from './App';
import './assets/sass/main.scss';

const store = createStore(rootStore, applyMiddleware(thunk));

// eslint-disable-next-line
console.warn('INITIAL STORE : ', store.getState());

const AppPlace = document.getElementById('startroom-plate');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    AppPlace
);

if (module.hot) {
    module.hot.accept('./App', () => {
        const StartroomApp = require('./App');
        render(<StartroomApp />, AppPlace);
    });
}
