import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from 'containers/App'
import muiTheme from 'theme'

const theme = createMuiTheme(muiTheme)

const Loading = (
  <div
    style={{
      height: '100vh',
      fontSize: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    Loading...
  </div>
);

/**
 * Root
 */
function Root() {
  return (
    <Suspense fallback={ Loading }>
      <BrowserRouter>
        <ThemeProvider theme={ theme }>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default Root;
