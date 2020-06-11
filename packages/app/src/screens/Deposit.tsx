import { Colors } from '@blueprintjs/core';
import React from 'react';

import { Button, KeyPad } from '../components';
import { useDepositMutation } from '../generated/urql';
import { AuthenticatedLayout } from '../layouts/Authenticated';
import { prettyNumber } from '../lib/misc';
import { useOvermind } from '../overmind';
import { Route } from '../overmind/router/state';

const Deposit = () => {
  const [showKeyPad, setShowKeyPad] = React.useState(false);

  return (
    <AuthenticatedLayout>
      <>
        <div className="font-bold mb-4">How much would you like to deposit?</div>

        <div className="flex flex-wrap justify-center">
          {showKeyPad ? (
            <DepositKeypad onClear={() => setShowKeyPad(false)} />
          ) : (
            <>
              <DepositButton amount={50} />
              <DepositButton amount={100} />
              <DepositButton amount={150} />
              <DepositButton amount={200} />
              <DepositButton amount={500} />
              <StyledButton text="Other" onClick={() => setShowKeyPad(true)} />
            </>
          )}
        </div>
      </>
    </AuthenticatedLayout>
  );
};

const StyledButton = ({ text, onClick, loading }: { text: string; onClick: () => void; loading?: boolean }) => {
  return (
    <Button className="w-2/5 m-2 px-2 py-4" colors={[Colors.ROSE2, Colors.RED5]} onClick={onClick} loading={loading}>
      {text}
    </Button>
  );
};

const DepositButton = ({ amount }: { amount: number }) => {
  const { deposit, isDepositing } = useDeposit();

  return <StyledButton text={`$${amount}`} loading={isDepositing} onClick={() => deposit(amount)} />;
};

const DepositKeypad = ({ onClear }: { onClear: () => void }) => {
  const { deposit, isDepositing } = useDeposit();

  const [value, setValue] = React.useState('');

  return (
    <>
      <div className="w-full font-semibold mb-4">$ {prettyNumber(value || '0', { includeDecimal: true })}</div>
      <KeyPad
        value={value}
        colors={[Colors.ROSE2, Colors.RED5]}
        canSubmit={!!value && value !== '0'}
        onSubmit={() => deposit(Number(value))}
        isSubmitting={isDepositing}
        onChange={val => setValue(val)}
        onClear={onClear}
      />
    </>
  );
};

function useDeposit() {
  const { state, actions } = useOvermind();
  const [{ fetching }, deposit] = useDepositMutation();

  const memoized = React.useCallback(
    async (amount: number) => {
      if (fetching) return;

      try {
        const res = await deposit({
          accountId: state.auth.currentAccount?.id!,
          amount,
        });
        let account = res.data?.deposit;

        if (account) {
          // a little hacky but refresh the user to see the changes
          await actions.auth.refreshUser();
          actions.notifications.success({
            key: 'deposit',
            message: `$${amount} Deposited!`,
          });
          actions.router.setRoute(Route.Overview);
        } else {
          actions.notifications.danger({
            key: 'deposit',
            message: res.error?.message || 'Something went wrong.',
          });
        }
      } catch (e) {
        actions.notifications.danger({
          key: 'deposit',
          message: e.message || 'Something went wrong.',
        });
      }
    },
    [actions, state.auth.currentAccount, fetching, deposit],
  );

  return {
    deposit: memoized,
    isDepositing: fetching,
  };
}

export default Deposit;
