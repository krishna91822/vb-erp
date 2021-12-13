import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCountries,
  getClientsData,
  handelClientData,
  changeActiveStatus,
} from "../../store/cims-actions";
import { uiActions } from "../../store/ui-slice";

export default function ClientHelpers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.cims.errors);

  useEffect(async () => {
    dispatch(fetchCountries());
    dispatch(getClientsData());
  }, []);

  const clientsList = useSelector((state) => state.cims.clientsList);

  const handleClientData = async (clientId, mode) => {
    dispatch(handelClientData(clientId, mode, errors));
    setTimeout(() => {
      navigate(`/cims/clientdetails/${clientId}`);
      dispatch(uiActions.toggleLoader());
    }, 3000);
  };

  const handelActiveStatus = async (clientId) => {
    dispatch(changeActiveStatus(clientId));
    setTimeout(() => {
      dispatch(getClientsData());
      dispatch(uiActions.toggleLoader());
    }, 3000);
  };

  return { clientsList, handleClientData, handelActiveStatus };
}
