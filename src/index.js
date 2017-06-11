import React from 'react';
import ReactDOM from 'react-dom';
import Studio from './Studio';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Studio />, document.getElementById('root'));
registerServiceWorker();
