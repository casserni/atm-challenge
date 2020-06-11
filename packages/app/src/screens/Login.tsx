import { Colors, Icon } from '@blueprintjs/core';
import React from 'react';

import { KeyPad } from '../components';
import { useLoginMutation } from '../generated/urql';
import { BaseLayout } from '../layouts/Base';
import { useOvermind } from '../overmind';

const Login = () => {
  const [pin, setPin] = React.useState('');
  const { login, isLoggingIn } = useLogin(pin);

  return (
    <BaseLayout>
      <>
        <Icon icon="resolve" iconSize={34} />
        <div className="py-4">Please enter your PIN code</div>

        <div className="w-full flex items-center justify-between px-16 pb-6">
          <Icon iconSize={28} icon={pin.length >= 1 ? 'dot' : 'minus'} />
          <Icon iconSize={28} icon={pin.length >= 2 ? 'dot' : 'minus'} />
          <Icon iconSize={28} icon={pin.length >= 3 ? 'dot' : 'minus'} />
          <Icon iconSize={28} icon={pin.length >= 4 ? 'dot' : 'minus'} />
        </div>

        <KeyPad
          colors={[Colors.COBALT1, Colors.INDIGO5]}
          value={pin}
          canSubmit={pin.length === 4}
          onSubmit={login}
          isSubmitting={isLoggingIn}
          onChange={value => {
            if (value.length <= 4) {
              setPin(value);
            }
          }}
        />
      </>
    </BaseLayout>
  );
};

function useLogin(pin: string) {
  const { actions } = useOvermind();
  const [{ fetching }, login] = useLoginMutation();

  const memoized = React.useCallback(async () => {
    try {
      const res = await login({ pin });
      let userId = res.data?.login;

      if (userId) {
        await actions.auth.setUserId(userId);
        await actions.auth.refreshUser();
        actions.notifications.success({
          key: 'login',
          message: 'Welcome Aboard!',
        });
        return;
      } else {
        actions.notifications.danger({
          key: 'login',
          message: res.error?.message || 'Something went wrong.',
        });
      }
    } catch (e) {
      actions.notifications.danger({
        key: 'login',
        message: e.message || 'Something went wrong.',
      });
    }
  }, [actions, login, pin]);

  return {
    login: memoized,
    isLoggingIn: fetching,
  };
}

export default Login;
