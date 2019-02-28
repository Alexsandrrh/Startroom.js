import React, {Component} from 'react';
import {render} from 'react-dom';
import './assets/sass/main.scss';

class App extends Component{
    render() {
        return (<h1>Say Helllo</h1>)
    }
}

render(<App/>, document.getElementById('app-x'))
