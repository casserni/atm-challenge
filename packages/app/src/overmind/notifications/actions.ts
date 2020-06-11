import { IToastProps, Position, Toaster } from '@blueprintjs/core';
import { Action } from 'overmind';

const AppToaster = Toaster.create({
  position: Position.BOTTOM,
});

type ToastOptions = IToastProps & { key: string };
export const alert: Action<ToastOptions> = (_, { key, ...props }) => {
  // strip out graphQL prefix
  let message = props.message;
  if (typeof message === 'string' && /\[GraphQL\]/.test(message)) {
    message = message.replace('[GraphQL] ', '');
  }

  AppToaster.show({ ...props, message });
};

export const success: Action<ToastOptions> = ({ actions }, options) => {
  actions.notifications.alert({ ...options, intent: 'success' });
};

export const info: Action<ToastOptions> = ({ actions }, options) => {
  actions.notifications.alert({ ...options, intent: 'primary' });
};

export const warning: Action<ToastOptions> = ({ actions }, options) => {
  actions.notifications.alert({ ...options, intent: 'warning' });
};

export const danger: Action<ToastOptions> = ({ actions }, options) => {
  actions.notifications.alert({ ...options, intent: 'danger' });
};
