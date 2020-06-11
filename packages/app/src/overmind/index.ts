import { IConfig } from 'overmind';
import { createHook } from 'overmind-react';
import { merge, namespaced } from 'overmind/config';

import * as api from './api';
import * as auth from './auth';
import * as notifications from './notifications';
import { onInitialize } from './onInitialize';
import * as router from './router';

export const config = merge({ onInitialize }, namespaced({ api, auth, notifications, router }));

// declare overmind with config typing so typescript has accurate references
declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}
export const useOvermind = createHook<typeof config>();
