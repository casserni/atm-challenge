import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'users',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.accounts({});
  },
});
