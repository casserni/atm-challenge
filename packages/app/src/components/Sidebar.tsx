import * as React from 'react';

import { prettyNumber } from '../lib/misc';
import { useOvermind } from '../overmind';

export const Sidebar = () => {
  const { state } = useOvermind();

  return (
    <div className="flex flex-col justify-center w-1/3 border-r mr-6 pr-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="font-bold mb-1">Customer</div>
        <div>{state.auth.currentUser?.name!}</div>

        <div className="font-bold mb-1 pt-8">Account Balance</div>
        <div className="pb-8">$ {prettyNumber(String(state.auth.currentAccount?.balance!))}</div>

        <div className="font-bold mb-1">Withdrawal Limit</div>
        <div>Daily: $ {prettyNumber(String(state.auth.currentAccount?.daily_withdrawal_limit!))}</div>
        <div>Remaining: $ {prettyNumber(String(state.auth.currentAccount?.remaining_withdrawal_limit!))}</div>
      </div>
    </div>
  );
};
