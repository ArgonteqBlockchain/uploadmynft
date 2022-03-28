import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './utils/connectors';
import ThemeProvider from './theme/ThemeProvider';

const App = () => {
  const content = useRoutes(routes);
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </ThemeProvider>
    </Web3ReactProvider>
  );
};
export default App;
