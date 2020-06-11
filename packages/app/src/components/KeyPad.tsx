import { Icon } from '@blueprintjs/core';
import cn from 'classnames';
import React from 'react';

import { Button } from './Button';

export const KeyPad = ({
  className,
  value,
  canSubmit,
  colors,
  isSubmitting,
  onChange,
  onSubmit,
  onClear,
}: {
  className?: string;
  value: string;
  colors: string[];
  canSubmit?: boolean;
  isSubmitting?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear?: () => void;
}) => {
  // map refs to keyCodes
  const refs = {
    input: React.useRef<any>(null),
    48: React.useRef<any>(null),
    49: React.useRef<any>(null),
    50: React.useRef<any>(null),
    51: React.useRef<any>(null),
    52: React.useRef<any>(null),
    53: React.useRef<any>(null),
    54: React.useRef<any>(null),
    55: React.useRef<any>(null),
    56: React.useRef<any>(null),
    57: React.useRef<any>(null),
    8: React.useRef<any>(null),
    13: React.useRef<any>(null),
  };

  React.useEffect(() => {
    if (refs.input.current) {
      refs.input.current.focus();
    }
  }, [refs.input]);

  return (
    <>
      <input
        className="opacity-0 absolute"
        ref={refs.input}
        onBlur={event => event.target.focus()}
        onKeyDown={event => {
          // @ts-ignore
          const ref = refs[event.keyCode];
          if (ref && ref.current) {
            ref.current.dispatchEvent(new Event('click', { bubbles: true }));
          }
        }}
      />
      <div style={{ width: 230 }} className={cn(className, 'flex flex-wrap items-center justify-center')}>
        <PinButton
          colors={colors}
          onClick={() => onChange(value + '1')}
          content="1"
          ref={refs[49]}
          disabled={!!isSubmitting}
        />
        <PinButton
          colors={colors}
          onClick={() => onChange(value + '2')}
          content="2"
          ref={refs[50]}
          disabled={!!isSubmitting}
        />
        <PinButton
          colors={colors}
          onClick={() => onChange(value + '3')}
          content="3"
          ref={refs[51]}
          disabled={!!isSubmitting}
        />
        <PinButton
          colors={colors}
          onClick={() => onChange(value + '4')}
          content="4"
          ref={refs[52]}
          disabled={!!isSubmitting}
        />
        <PinButton
          colors={colors}
          onClick={() => onChange(value + '5')}
          content="5"
          ref={refs[53]}
          disabled={!!isSubmitting}
        />
        <PinButton
          colors={colors}
          onClick={() => onChange(value + '6')}
          content="6"
          ref={refs[54]}
          disabled={!!isSubmitting}
        />
        <PinButton
          colors={colors}
          onClick={() => onChange(value + '7')}
          content="7"
          ref={refs[55]}
          disabled={!!isSubmitting}
        />
        <PinButton
          colors={colors}
          onClick={() => onChange(value + '8')}
          content="8"
          ref={refs[56]}
          disabled={!!isSubmitting}
        />
        <PinButton
          colors={colors}
          onClick={() => onChange(value + '9')}
          content="9"
          ref={refs[57]}
          disabled={!!isSubmitting}
        />

        <PinButton
          colors={colors}
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          content={<Icon icon="reset" />}
          disabled={!!isSubmitting}
        />

        <PinButton
          colors={colors}
          onClick={() => onChange(value + '0')}
          content="0"
          ref={refs[48]}
          disabled={!!isSubmitting}
        />

        <PinButton
          colors={colors}
          content={<Icon icon="undo" />}
          onClick={() => onChange(value.slice(0, -1))}
          ref={refs[8]}
          disabled={!!isSubmitting}
        />

        <SubmitButton
          colors={colors}
          canSubmit={!!canSubmit}
          onSubmit={onSubmit}
          loading={!!isSubmitting}
          ref={refs[13]}
        />
      </div>
    </>
  );
};

const PinButton = React.forwardRef<
  HTMLButtonElement,
  {
    content: React.ReactElement | string;
    onClick: () => void;
    colors: string[];
    disabled: boolean;
  }
>(({ content, colors, disabled, onClick }, ref) => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className="w-1/3 flex justify-center mb-4">
      <Button
        ref={ref}
        rounded
        className={isActive ? 'opacity-75' : ''}
        style={{ height: 50, width: 50 }}
        colors={colors}
        disabled={disabled}
        onClick={() => {
          setIsActive(true);
          setTimeout(() => setIsActive(false), 100);
          onClick();
        }}
      >
        {content}
      </Button>
    </div>
  );
});
PinButton.displayName = 'PinButton';

const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  {
    colors: string[];
    canSubmit: boolean;
    onSubmit: () => void;
    loading: boolean;
  }
>(({ colors, onSubmit, canSubmit, loading }, ref) => {
  return (
    <Button
      ref={ref}
      className="mt-2"
      colors={colors}
      onClick={() => canSubmit && onSubmit()}
      disabled={!canSubmit}
      loading={loading}
    >
      Submit
    </Button>
  );
});
SubmitButton.displayName = 'SubmitButton';
