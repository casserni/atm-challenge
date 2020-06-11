import { Colors, Icon, IIconProps } from '@blueprintjs/core';
import React from 'react';

import { Button } from '../components';
import { AuthenticatedLayout } from '../layouts/Authenticated';
import { useOvermind } from '../overmind';
import { Route } from '../overmind/router/state';

const Home = () => {
  return (
    <AuthenticatedLayout>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <TransactionButton text="Make a deposit" icon="bank-account" route={Route.Deposit} />
        <TransactionButton text="Withdraw cash" icon="dollar" route={Route.Withdraw} />
      </div>
    </AuthenticatedLayout>
  );
};

const TransactionButton = ({ route, text, icon }: { route: Route; text: string; icon: IIconProps['icon'] }) => {
  const { actions } = useOvermind();
  return (
    <Button
      className="py-4 mb-3 w-2/3"
      colors={[Colors.ORANGE1, Colors.ORANGE4]}
      onClick={() => actions.router.setRoute(route)}
    >
      <Icon icon={icon} />
      <div className="ml-4">{text}</div>
    </Button>
  );
};

export default Home;
