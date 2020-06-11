import { Action } from 'overmind';

import { Route } from './state';

export const setRoute: Action<Route> = ({ state }, route) => {
  state.router.route = route;
};
