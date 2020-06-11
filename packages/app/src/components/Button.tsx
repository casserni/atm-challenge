import { Spinner } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';

interface IButtonProps {
  className?: string;
  style?: React.CSSProperties;
  colors: string[];
  disabled?: boolean;
  fill?: boolean;
  rounded?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, style = {}, colors, fill, disabled, rounded, children, loading, onClick }, ref) => {
    const color = colors.length > 1 ? `linear-gradient(to bottom right, ${colors.join(',')})` : colors[0];

    return (
      <button
        ref={ref}
        style={{
          background: color,
          ...style,
        }}
        onClick={() => !disabled && !loading && onClick && onClick()}
        className={cn(
          className,
          'flex items-center justify-center rounded px-4 py-2 font-semibold select-none hover:opacity-75 focus:outline-none',
          rounded ? 'rounded-full' : 'rounded',
          fill && 'w-full',
          disabled || loading ? 'cursor-not-allowed opacity-75' : 'cursor-pointer shadow-xl hover:shadow-none',
        )}
      >
        <span className={cn('flex items-center justify-center w-full', loading && 'invisible')}>{children}</span>
        {loading && <Spinner className="absolute" size={Spinner.SIZE_SMALL} />}
      </button>
    );
  },
);

Button.displayName = 'Button';
