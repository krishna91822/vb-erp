import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const Notification = (props) => {
  const dispatch = useDispatch();

  const afterToast = () => {
    toast.clearWaitingQueue();
    dispatch(uiActions.showNotification(null));
  };

  if (props.status === "success") {
    toast.success("Success", {
      position: toast.POSITION.TOP_CENTER,
      onClose: afterToast,
      theme: "dark",
    });
  }
  if (props.status === "error") {
    toast.error("OOPS Looks like something Happened!", {
      position: toast.POSITION.TOP_CENTER,
      onClose: afterToast,
      theme: "dark",
    });
  }

  return <ToastContainer autoClose={3000} limit={3} />;
};

export default Notification;
