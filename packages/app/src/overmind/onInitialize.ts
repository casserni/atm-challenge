import { OnInitialize, rehydrate } from 'overmind';

import { getStorage, setStorage } from '../lib/storage';

export const onInitialize: OnInitialize = ({ state }, overmind) => {
  // anytime an update is triggered we want to update session storage
  overmind.addFlushListener(() => setStorage(state));

  // rehydrate overmind on initial loads
  const prevState = getStorage();
  if (prevState) {
    rehydrate(state, prevState);
  }
};
