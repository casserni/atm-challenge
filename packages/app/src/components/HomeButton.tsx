import { Icon, Popover, Position } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';

import { useOvermind } from '../overmind';
import { Route } from '../overmind/router/state';

export const HomeButton = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  const { actions } = useOvermind();

  return (
    <Popover
      position={Position.TOP_LEFT}
      content={<div className="px-4 py-2">Home</div>}
      minimal
      interactionKind="hover"
    >
      <Icon
        icon="home"
        style={style}
        className={cn(className, 'cursor-pointer')}
        onClick={() => {
          actions.router.setRoute(Route.Overview);
        }}
      />
    </Popover>
  );
};
