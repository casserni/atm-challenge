import { makeSchema, objectType } from '@nexus/schema';
import { nexusPrismaPlugin } from 'nexus-prisma';
import * as path from 'path';

import * as Models from './models';
import * as Mutations from './mutations';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.users({
      filtering: { id: true },
    });
  },
});

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    Mutations.DepositMutation(t);
    Mutations.LoginMutation(t);
    Mutations.WithdrawMutation(t);
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, Models.Account, Models.User, Models.Transaction],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: path.join(__dirname, '/../../schema.graphql'),
    typegen: path.join(__dirname, '../', './generated/nexus.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('../context'),
        alias: 'Context',
      },
    ],
  },
});
