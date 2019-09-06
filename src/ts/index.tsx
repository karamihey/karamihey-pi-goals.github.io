// polyfills
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// libraries
import React from 'react';
import ReactDOM from 'react-dom';
// components
import App from 'components/App';
// styles
import 'scss/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));
