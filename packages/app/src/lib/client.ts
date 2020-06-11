import { cacheExchange } from '@urql/exchange-graphcache';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { Client, ClientOptions as UrqlClientOptions, dedupExchange, fetchExchange } from 'urql';

/**
 *  HTTP GQL Client Logic
 */
export type ClientOptions = {
  options?: UrqlClientOptions;
};

let urqlClient: Client;
let clientCache: ReturnType<typeof cacheExchange>;
let _subscriptionClient: any = null;

export function getClient(): ReturnType<typeof createClient> {
  return {
    urqlClient,
    clientCache,
    _subscriptionClient,
  };
}

export function createClient({ options }: ClientOptions = {}) {
  if (!urqlClient) {
    // use custom cacheExchange for future flexibility
    // this can allow use to set custom cache keys
    clientCache = cacheExchange({});

    // GRAPHQL-NEXUS DOES NOT SUPPORT SUBSCRIPTIONS :( so this is demonstrative on how to add the exchange
    _subscriptionClient = new SubscriptionClient('ws://localhost:4000/graphql', { reconnect: true });

    urqlClient = new Client({
      url: 'http://localhost:4000/graphql',
      ...options,
      // do not use regular default, cache-first. cache-and-network might result in more requests, but it's far "safer"
      requestPolicy: 'cache-and-network',
      exchanges: [
        // these are the default exchanges recommended by urql
        dedupExchange,
        clientCache,
        fetchExchange,

        // example of the subscription exchange
        // subscriptionExchange({
        //   forwardSubscription: (operation) =>
        //     subscriptionClient.request(operation),
        // }),
      ],
    });
  }

  return {
    urqlClient,
    clientCache,
    _subscriptionClient,
  };
}
