import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

axios.interceptors.request.use(req => {
  console.log(req);
  return req;
}, error => {
  console.log(error);
  return Promise.reject(error)
});

axios.interceptors.response.use(res => {
  console.log(res);
  return res;
}, error => {
  console.log(error);
  return Promise.reject(error)
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
