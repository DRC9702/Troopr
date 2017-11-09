import React from 'react';
import ReactDOM from 'react-dom';
// import {Router, Route, browserHistory} from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
// import MainViewer from '.。/Component/MainViewer';
// import MainViewer from './Component/MainViewer';
// import EmptyLayout from './layouts/empty_layout.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
// registerServiceWorker();
