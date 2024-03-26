import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import theme from '../src/theme';

ReactDOM.render(React.createElement(App, { theme }), document.getElementById('root'));
