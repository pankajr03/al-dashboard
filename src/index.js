import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
// "proxy": "https://3jdnj4lom0.execute-api.us-east-1.amazonaws.com/production/"