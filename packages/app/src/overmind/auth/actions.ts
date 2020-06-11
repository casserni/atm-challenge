import { Action, AsyncAction } from 'overmind';

import { MeDocument, MeQuery, MeQueryVariables } from '../../generated/urql';
import { Route } from '../router/state';

export const setUserId: Action<number | null> = ({ state }, id) => {
  state.auth.currentUserId = id;
};

export const refreshUser: AsyncAction = async ({ state, effects }) => {
  if (!state.auth.currentUserId) {
    state.auth.currentUser = null;
    return;
  }

  try {
    const res = await effects.api.executeQuery<MeQuery, MeQueryVariables>(MeDocument, {
      id: state.auth.currentUserId!,
    });
    state.auth.currentUser = res.data?.users[0] || null;
  } catch (e) {
    console.log(e);
    state.auth.currentUser = null;
  }
};

export const logout: AsyncAction = async ({ state, actions }) => {
  state.router.route = Route.Overview;
  state.auth.currentUserId = null;
  await actions.auth.refreshUser();
};
