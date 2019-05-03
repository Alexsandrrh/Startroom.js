import React, { Component } from 'react';

const styleBlock = {
    padding: '40px'
};

const styleHeadline = {
    fontFamily: 'Arial',
    fontSize: '40px',
    fontWeight: 900,
    color: '#111111',
    marginBottom: '15px'
};

const styleBlockquote = {
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: 500,
    color: '#888888'
};

class App extends Component {
    render() {
        return (
            <div style={styleBlock}>
                <h1 style={styleHeadline}>Hello, I'm your new project on React</h1>
                <blockquote style={styleBlockquote}>by Startroom.js</blockquote>
            </div>
        );
    }
}

export default App;
