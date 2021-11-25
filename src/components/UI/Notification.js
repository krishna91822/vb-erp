import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from './../../redux/ui/ui.actions';

const Notification = (props) => {
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  const afterToast = () => {
    toast.clearWaitingQueue();
    if (notification) dispatch(showNotification(null));
  };

  if (props.status === 'success') {
    toast.success('Success', {
      position: toast.POSITION.TOP_CENTER,
      onClose: afterToast,
      theme: 'dark',
    });
  }
  if (props.status === 'error') {
    toast.error('OOPS Looks like something Happened!', {
      position: toast.POSITION.TOP_CENTER,
      onClose: afterToast,
      theme: 'dark',
    });
  }

  return <ToastContainer autoClose={3000} limit={3} />;
};

export default React.memo(Notification);
