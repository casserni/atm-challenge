import { OnInitialize } from 'overmind';

import { createClient } from '../../lib/client';

// create HTTP/GQL client when overmind is initialized
export const onInitialize: OnInitialize = () => {
  createClient();
};
