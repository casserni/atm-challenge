import './styles/index.css';
import './styles/tailwind.css';
import './styles/blueprint.css';

import React from 'react';

import { useOvermind } from './overmind';
import { Route } from './overmind/router/state';
import Deposit from './screens/Deposit';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import Withdraw from './screens/Withdraw';

function App() {
  const { state } = useOvermind();

  if (!state.auth.currentUser) {
    return <Login />;
  }

  switch (state.router.route) {
    case Route.Overview:
      return <Home />;

    case Route.Deposit:
      return <Deposit />;

    case Route.Withdraw:
      return <Withdraw />;

    default:
      return <NotFound />;
  }
}

export default App;
