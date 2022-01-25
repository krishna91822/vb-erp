import { Main } from "../../components/CMS/Main";
import { PoSowActions } from "../../store/CMS/POSOW-slice";
import { useDispatch } from "react-redux";

const POSOW_tabView = () => {
  const dispatch = useDispatch();
  dispatch(PoSowActions.setClone(false));
  return <Main />;
};
export default POSOW_tabView;
