import { Classes, Colors } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';

export const BaseLayout: React.FunctionComponent<{
  colors?: string[];
  height?: number;
  width?: number;
}> = ({ colors = [Colors.VIOLET1, Colors.ORANGE1], height = 500, width = 300, children }) => {
  return (
    <div
      style={{
        background: `linear-gradient(to bottom right, ${colors.join(',')})`,
      }}
      className={cn(
        Classes.DARK,
        'flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-gray-300 text-base',
      )}
    >
      <div
        style={{
          minHeight: height,
          minWidth: width,
          background: 'rgba(0,0,0, 0.4)',
        }}
        className="p-6 flex flex-col items-center rounded"
      >
        {children}
      </div>
    </div>
  );
};
