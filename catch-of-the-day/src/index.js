// loads everything from the react library in to variable React, es6 module
import React from 'react';
import {render} from 'react-dom'; // importing just the render method from 'react-dom'
import {BrowserRouter, Match, Miss} from 'react-router';

import './css/style.css'; // rather than a link in our index.html,  let webpack do it
import App from './components/App';
import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker.js';

const repo = `/${window.location.pathname.split("/")[1]}`;
const Root = () => {
  return (
    <BrowserRouter basename={repo}>
    <div>
      <Match exactly pattern="/" component={StorePicker} />
      <Match pattern="/store/:storeId" component={App} />
      <Miss component={NotFound} />
       </div>
    </BrowserRouter>

    )
}

render(<Root/>, document.querySelector('#main'));
