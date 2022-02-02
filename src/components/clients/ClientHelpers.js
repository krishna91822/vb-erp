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
import { cimsActions } from "../../store/cims-slice";

export default function ClientHelpers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const errors = useSelector((state) => state.cims.errors);

  // Pagination
  const pages = useSelector((state) => state.cims.pages);
  const pageNo = useSelector((state) => state.cims.pageNo);

  // Sorting
  const sortBy = useSelector((state) => state.cims.sortBy);
  const filterBy = useSelector((state) => state.cims.filterBy);
  const sortingOrder = useSelector((state) => state.cims.sortingOrder);

  // Search
  const searchBy = useSelector((state) => state.cims.searchBy);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(getClientsData(pageNo, sortBy, filterBy, sortingOrder, searchBy));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clientsList = useSelector((state) => state.cims.clientsList);

  const handleClientData = async (clientId, mode) => {
    dispatch(handelClientData(clientId, mode, errors));
    setTimeout(() => {
      navigate(`/cims/clientdetails/${clientId}`);
      dispatch(uiActions.toggleLoader());
    }, 1000);
  };

  const handelActiveStatus = async (clientId, clientStatus, brandName) => {
    dispatch(changeActiveStatus(clientId, clientStatus, brandName));
    setTimeout(() => {
      dispatch(
        getClientsData(pageNo, sortBy, filterBy, sortingOrder, searchBy)
      );
      dispatch(uiActions.toggleLoader());
    }, 3000);
  };

  const handelSearch = (e) => {
    const target = e.target.value.replace(/[^\w\s]/gi, "");

    dispatch(cimsActions.setSearchBy(target));
    if (e.key === "Enter") {
      if (target !== "" && target.length > 1)
        dispatch(getClientsData(1, sortBy, filterBy, sortingOrder, target));
      else if (target === "")
        dispatch(
          getClientsData(pageNo, sortBy, filterBy, sortingOrder, target)
        );
    }
  };

  const handelClearSearch = () => {
    dispatch(cimsActions.setSearchBy(""));
    dispatch(getClientsData(pageNo, sortBy, filterBy, sortingOrder, ""));
  };

  const handelPageChange = (event, value) => {
    dispatch(cimsActions.setPageNo(value));
    dispatch(getClientsData(value, sortBy, filterBy, sortingOrder, searchBy));
  };

  const handelSortBy = (value) => {
    dispatch(cimsActions.setSortBy(value));
    dispatch(getClientsData(pageNo, value, filterBy, sortingOrder, searchBy));
  };

  const handelFilterBy = (value) => {
    dispatch(cimsActions.setFilterBy(value));
    dispatch(cimsActions.setPageNo(1));
    dispatch(getClientsData(1, sortBy, value, sortingOrder, searchBy));
  };

  const handelSortingOrder = (value) => {
    const order = value ? 1 : -1;
    dispatch(cimsActions.setSortingOrder(order));
    dispatch(getClientsData(pageNo, sortBy, filterBy, order, searchBy));
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
    searchBy,
    handelSortBy,
    handelFilterBy,
    handelSortingOrder,
    handelSearch,
    handelClearSearch,

    user,
  };
}
