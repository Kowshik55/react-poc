import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import { store } from './store';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e88e5'
    },
    secondary: {
      main: '#ff4081'
    },
    background: {
      default: '#f5f7ff',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(',')
  },
  shape: {
    borderRadius: 12
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
