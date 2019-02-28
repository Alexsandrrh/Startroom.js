import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import allReducers from './reducers/index.js';
import App from './App';
import './assets/sass/main.scss';

const store = createStore(allReducers);

console.log(store.getState());

render(<App store={store}/>, document.getElementById('app-x'));
