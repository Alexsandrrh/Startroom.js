import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component{
    constructor (props) {
        super (props);

        this.state = {
            store : props.store
        };
    }

    render() {
        return (<Provider store={this.state.store}>
                    <h3>hello</h3>
                </Provider>)
    }
}


