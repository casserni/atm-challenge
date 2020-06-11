import { DocumentNode } from 'graphql';
import { OperationContext } from 'urql';

import { getClient } from '../../lib/client';

const c = {
  get client() {
    return getClient();
  },
};

/**
 * Internal Helpers
 */

export const executeMutation = async <Data = any, Variables extends object = {}>(
  query: DocumentNode | string,
  variables?: Variables,
  context?: Partial<OperationContext>,
) => {
  return await c.client.urqlClient.mutation<Data, Variables>(query, variables, context).toPromise();
};

export const executeQuery = async <Data = any, Variables extends object = {}>(
  query: DocumentNode | string,
  variables?: Variables,
  context?: Partial<OperationContext>,
) => {
  return await c.client.urqlClient.query<Data, Variables>(query, variables, context).toPromise();
};
