import { createOvermind } from 'overmind';
import { Provider as OvermindProvider } from 'overmind-react';
import React from 'react';
import { render } from 'react-dom';
import { Provider as UrqlProvider } from 'urql';

import App from './App';
import { getClient } from './lib/client';
import { config as overmindConfig } from './overmind';

const overmindStore = createOvermind(overmindConfig);

// @ts-ignore set on window for rehydration purposes
window.__OVERMIND = overmindStore;

render(
  <UrqlProvider value={getClient().urqlClient}>
    <OvermindProvider value={overmindStore}>
      <App />
    </OvermindProvider>
  </UrqlProvider>,
  document.getElementById('root'),
);
