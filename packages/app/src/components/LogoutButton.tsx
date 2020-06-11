import { Icon, Popover, Position } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';

import { useOvermind } from '../overmind';

export const LogoutButton = ({ className }: { className?: string }) => {
  const { actions } = useOvermind();

  return (
    <Popover
      position={Position.TOP_LEFT}
      content={<div className="px-4 py-2">Log Out</div>}
      minimal
      interactionKind="hover"
    >
      <Icon icon="log-out" className={cn(className, 'cursor-pointer')} onClick={() => actions.auth.logout()} />
    </Popover>
  );
};
