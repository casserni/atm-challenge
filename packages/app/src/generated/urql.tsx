import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Accounts = {
   __typename?: 'accounts';
  balance: Scalars['Int'];
  daily_withdrawal_limit: Scalars['Int'];
  id: Scalars['Int'];
  remaining_withdrawal_limit: Scalars['Int'];
  transactions: Array<Transactions>;
  type: Scalars['String'];
  user_id: Scalars['Int'];
};


export type AccountsTransactionsArgs = {
  skip?: Maybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type Mutation = {
   __typename?: 'Mutation';
  deposit?: Maybe<Accounts>;
  login?: Maybe<Scalars['Int']>;
  withdraw?: Maybe<Accounts>;
};


export type MutationDepositArgs = {
  accountId: Scalars['Int'];
  amount: Scalars['Int'];
};


export type MutationLoginArgs = {
  pin: Scalars['String'];
};


export type MutationWithdrawArgs = {
  accountId: Scalars['Int'];
  amount: Scalars['Int'];
};

export type Query = {
   __typename?: 'Query';
  users: Array<Users>;
};


export type QueryUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<QueryUsersWhereInput>;
};

export type QueryUsersWhereInput = {
  id?: Maybe<IntFilter>;
};

export type Transactions = {
   __typename?: 'transactions';
  account_id?: Maybe<Scalars['Int']>;
  amount: Scalars['Int'];
  id: Scalars['Int'];
  type: Scalars['String'];
};

export type Users = {
   __typename?: 'users';
  accounts: Array<Accounts>;
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type UsersAccountsArgs = {
  skip?: Maybe<Scalars['Int']>;
};

export type DepositMutationVariables = {
  accountId: Scalars['Int'];
  amount: Scalars['Int'];
};


export type DepositMutation = (
  { __typename?: 'Mutation' }
  & { deposit?: Maybe<(
    { __typename?: 'accounts' }
    & Pick<Accounts, 'id'>
    & Account_ItemFragment
  )> }
);

export type LoginMutationVariables = {
  pin: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type MeQueryVariables = {
  id: Scalars['Int'];
};


export type MeQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'users' }
    & Pick<Users, 'id'>
    & User_ItemFragment
  )> }
);

export type WithdrawMutationVariables = {
  accountId: Scalars['Int'];
  amount: Scalars['Int'];
};


export type WithdrawMutation = (
  { __typename?: 'Mutation' }
  & { withdraw?: Maybe<(
    { __typename?: 'accounts' }
    & Pick<Accounts, 'id'>
    & Account_ItemFragment
  )> }
);

export type Account_ItemFragment = (
  { __typename?: 'accounts' }
  & Pick<Accounts, 'id' | 'balance' | 'daily_withdrawal_limit' | 'remaining_withdrawal_limit' | 'type'>
);

export type User_ItemFragment = (
  { __typename?: 'users' }
  & Pick<Users, 'id' | 'name'>
  & { accounts: Array<(
    { __typename?: 'accounts' }
    & Pick<Accounts, 'id'>
    & Account_ItemFragment
  )> }
);

export const Account_ItemFragmentDoc = gql`
    fragment Account_Item on accounts {
  id
  balance
  daily_withdrawal_limit
  remaining_withdrawal_limit
  type
}
    `;
export const User_ItemFragmentDoc = gql`
    fragment User_Item on users {
  id
  name
  accounts {
    id
    ...Account_Item
  }
}
    ${Account_ItemFragmentDoc}`;
export const DepositDocument = gql`
    mutation Deposit($accountId: Int!, $amount: Int!) {
  deposit(accountId: $accountId, amount: $amount) {
    id
    ...Account_Item
  }
}
    ${Account_ItemFragmentDoc}`;

export function useDepositMutation() {
  return Urql.useMutation<DepositMutation, DepositMutationVariables>(DepositDocument);
};
export const LoginDocument = gql`
    mutation Login($pin: String!) {
  login(pin: $pin)
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const MeDocument = gql`
    query Me($id: Int!) {
  users(skip: 0, where: {id: {equals: $id}}) {
    id
    ...User_Item
  }
}
    ${User_ItemFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const WithdrawDocument = gql`
    mutation Withdraw($accountId: Int!, $amount: Int!) {
  withdraw(accountId: $accountId, amount: $amount) {
    id
    ...Account_Item
  }
}
    ${Account_ItemFragmentDoc}`;

export function useWithdrawMutation() {
  return Urql.useMutation<WithdrawMutation, WithdrawMutationVariables>(WithdrawDocument);
};