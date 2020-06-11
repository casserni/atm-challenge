import { Colors } from '@blueprintjs/core';
import React from 'react';

import { Button, KeyPad } from '../components';
import { useWithdrawMutation } from '../generated/urql';
import { AuthenticatedLayout } from '../layouts/Authenticated';
import { prettyNumber } from '../lib/misc';
import { useOvermind } from '../overmind';
import { Route } from '../overmind/router/state';

const Withdraw = () => {
  const [showKeyPad, setShowKeyPad] = React.useState(false);

  return (
    <AuthenticatedLayout>
      <>
        <div className="font-bold mb-4">How much would you like to withdraw?</div>

        <div className="flex flex-wrap justify-center">
          {showKeyPad ? (
            <WithdrawKeypad onClear={() => setShowKeyPad(false)} />
          ) : (
            <>
              <WithdrawButton amount={50} />
              <WithdrawButton amount={100} />
              <WithdrawButton amount={150} />
              <WithdrawButton amount={200} />
              <WithdrawButton amount={500} />
              <StyledButton text="Other" onClick={() => setShowKeyPad(true)} />
            </>
          )}
        </div>
      </>
    </AuthenticatedLayout>
  );
};

const StyledButton = ({
  text,
  onClick,
  loading,
  disabled,
}: {
  text: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <Button
      className="w-2/5 m-2 px-2 py-4"
      colors={[Colors.FOREST1, Colors.GREEN4]}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

const WithdrawButton = ({ amount }: { amount: number }) => {
  const { state } = useOvermind();
  const { withdraw, isWithdrawing } = useWithdraw();

  const disabled =
    amount > state.auth.currentAccount?.balance! || amount > state.auth.currentAccount?.remaining_withdrawal_limit!;

  return (
    <StyledButton text={`$${amount}`} disabled={disabled} loading={isWithdrawing} onClick={() => withdraw(amount)} />
  );
};

const WithdrawKeypad = ({ onClear }: { onClear: () => void }) => {
  const { withdraw, isWithdrawing } = useWithdraw();
  const [value, setValue] = React.useState('');

  return (
    <>
      <div className="w-full font-semibold mb-4">$ {prettyNumber(value || '0', { includeDecimal: true })}</div>
      <KeyPad
        value={value}
        colors={[Colors.FOREST1, Colors.GREEN4]}
        canSubmit={!!value && value !== '0'}
        onSubmit={() => withdraw(Number(value))}
        isSubmitting={isWithdrawing}
        onChange={val => setValue(val)}
        onClear={onClear}
      />
    </>
  );
};

function useWithdraw() {
  const { state, actions } = useOvermind();
  const [{ fetching }, withdraw] = useWithdrawMutation();

  const memoized = React.useCallback(
    async (amount: number) => {
      if (fetching) return;

      try {
        const res = await withdraw({
          accountId: state.auth.currentAccount?.id!,
          amount,
        });
        let account = res.data?.withdraw;

        if (account) {
          // a little hacky but refresh the user to see the changes
          await actions.auth.refreshUser();
          actions.notifications.success({
            key: 'withdraw',
            message: `$${amount} Withdrawn!`,
          });
          actions.router.setRoute(Route.Overview);
        } else {
          actions.notifications.danger({
            key: 'withdraw',
            message: res.error?.message || 'Something went wrong.',
          });
        }
      } catch (e) {
        actions.notifications.danger({
          key: 'withdraw',
          message: e.message || 'Something went wrong.',
        });
      }
    },
    [actions, state.auth.currentAccount, fetching, withdraw],
  );

  return {
    withdraw: memoized,
    isWithdrawing: fetching,
  };
}

export default Withdraw;
