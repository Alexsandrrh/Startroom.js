const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const argv = require('yargs').argv;
const isDevelop = argv.development;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

if (isDevelop) {
    const webpackConfig = require('./webpack.config.js');
    const compiler = require('webpack')(webpackConfig);

    const devMiddleware = require('webpack-dev-middleware');

    app.use(
        devMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
    );
} else {
    app.use(express.static(path.join(__dirname, 'dist')));
}

app.listen(3000, () => {
    const phrase = `http://localhost:3000`;
    console.log(phrase);
});
