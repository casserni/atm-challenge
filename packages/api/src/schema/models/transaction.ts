import { objectType } from '@nexus/schema';

export const Transaction = objectType({
  name: 'transactions',
  definition(t) {
    t.model.id();
    t.model.type();
    t.model.amount();
    t.model.account_id();
  },
});
