// loads everything from the react library in to variable React, es6 module
import React from 'react';
import {render} from 'react-dom'; // importing just the render method from 'react-dom'
import './css/style.css'; // rather than a link in our index.html,  let webpack do it
import App from './components/App';


import StorePicker from './components/StorePicker.js';

render(<App/>, document.querySelector('#main'));
