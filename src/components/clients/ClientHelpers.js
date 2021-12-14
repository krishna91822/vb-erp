import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCountries,
  getClientsData,
  handelClientData,
  changeActiveStatus,
  searchClient,
} from "../../store/cims-actions";
import { uiActions } from "../../store/ui-slice";
import { cimsActions } from "../../store/cims-slice";

export default function ClientHelpers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.cims.errors);

  // Pagination
  const pages = useSelector((state) => state.cims.pages);
  const pageNo = useSelector((state) => state.cims.pageNo);

  // Sorting
  const sortBy = useSelector((state) => state.cims.sortBy);
  const filterBy = useSelector((state) => state.cims.filterBy);
  const sortingOrder = useSelector((state) => state.cims.sortingOrder);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(getClientsData(pageNo, sortBy, filterBy, sortingOrder));
  }, []);

  const clientsList = useSelector((state) => state.cims.clientsList);

  const handleClientData = async (clientId, mode) => {
    dispatch(handelClientData(clientId, mode, errors));
    setTimeout(() => {
      navigate(`/cims/clientdetails/${clientId}`);
      dispatch(uiActions.toggleLoader());
    }, 3000);
  };

  const handelActiveStatus = async (clientId, clientStatus, brandName) => {
    dispatch(changeActiveStatus(clientId, clientStatus, brandName));
    setTimeout(() => {
      dispatch(getClientsData(pageNo, sortBy, filterBy, sortingOrder));
      dispatch(uiActions.toggleLoader());
    }, 3000);
  };

  const handelSearch = (e) => {
    const target = e.target.value.replace(/[^\w\s]/gi, "");
    console.log(target, target.length);
    if (target !== "" && target.length > 2)
      dispatch(searchClient(target, filterBy));
    else if (target === "")
      dispatch(getClientsData(pageNo, sortBy, filterBy, sortingOrder));
  };

  const handelPageChange = (event, value) => {
    dispatch(cimsActions.setPageNo(value));
    dispatch(getClientsData(value, sortBy, filterBy, sortingOrder));
  };

  const handelSortBy = (value) => {
    dispatch(cimsActions.setSortBy(value));
    dispatch(getClientsData(pageNo, value, filterBy, sortingOrder));
  };

  const handelFilterBy = (value) => {
    dispatch(cimsActions.setFilterBy(value));
    dispatch(cimsActions.setPageNo(1));
    dispatch(getClientsData(1, sortBy, value, sortingOrder));
  };

  const handelSortingOrder = (value) => {
    const order = value ? 1 : -1;
    console.log(value, order);
    dispatch(cimsActions.setSortingOrder(order));
    dispatch(getClientsData(pageNo, sortBy, filterBy, order));
  };

  return {
    clientsList,
    handleClientData,
    handelActiveStatus,

    pages,
    pageNo,
    handelPageChange,

    sortBy,
    filterBy,
    sortingOrder,
    handelSortBy,
    handelFilterBy,
    handelSortingOrder,
    handelSearch,
  };
}
