import { Colors } from '@blueprintjs/core';
import React from 'react';

import { HomeButton, LogoutButton, Sidebar } from '../components';
import { BaseLayout } from './Base';

export const AuthenticatedLayout: React.FunctionComponent<{
  colors?: string[];
}> = ({ colors = [Colors.BLUE5, Colors.INDIGO2], children }) => {
  return (
    <BaseLayout width={650} height={300} colors={colors}>
      <div className="flex h-full w-full relative">
        <Sidebar />

        <HomeButton className="absolute top-0 right-0" />
        <LogoutButton className="absolute bottom-0 right-0" />

        <div className="flex flex-col justify-center w-2/3 text-center h-full">{children}</div>
      </div>
    </BaseLayout>
  );
};
