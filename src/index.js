import React from 'react';
import ReactDOM from 'react-dom';
import data from './data/classes.js';
import './index.css';
import '@citizensadvice/cads/build/cads.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// JSON

ReactDOM.render(<App data={data} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
