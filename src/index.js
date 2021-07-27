import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, CssBaseline, ThemeProvider, responsiveFontSizes } from '@material-ui/core';
import App from './App';

import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


let darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});
darkTheme = responsiveFontSizes(darkTheme);

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
