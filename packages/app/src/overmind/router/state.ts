// SUPER simple routing to get navigation working

export enum Route {
  Withdraw = 'Withdraw',
  Deposit = 'Deposit',
  Overview = 'Overview',
  NotFound = 'NotFound',
}

export type State = {
  route: Route;
};

export const state = {
  route: 'Overview',
};
