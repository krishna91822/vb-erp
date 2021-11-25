export const toggle = () => ({
  type: 'UI_TOGGLE',
});

export const showNotification = (notification) => ({
  type: 'SHOW_NOTIFICATION',
  payload: notification,
});

export const toggleLoader = () => ({
  type: 'TOGGLE_LOADER',
});
