import { CapturePO_SOW } from "../../components/CMS/POSOW_FORM/CapturePO_SOW";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PoSowActions } from "../../store/CMS/POSOW-slice";
const POSOW_FORM = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(PoSowActions.clearData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line react/jsx-pascal-case
  return <CapturePO_SOW editBtn={false} toggleState={false} />;
};

export default POSOW_FORM;
