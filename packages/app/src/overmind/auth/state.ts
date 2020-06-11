import { Derive } from 'overmind';

import { MeQuery } from '../../generated/urql';

export type User = NonNullable<MeQuery['users'][number]>;
export type Account = User['accounts'][number];

export type State = {
  currentUserId: number | null;
  currentUser: User | null;
  currentAccount: Derive<State, Account | null>;
};

export const state: State = {
  currentUser: null,
  currentUserId: null,

  currentAccount: state => state.currentUser?.accounts?.[0] || null,
};
