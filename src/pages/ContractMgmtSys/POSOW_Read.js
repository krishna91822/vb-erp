import { CapturePO_SOW } from "../../components/CMS/POSOW_FORM/CapturePO_SOW";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { useParams } from "react-router";
import { fetchSpecificPO_SOW } from "../../store/CMS/POSOW-actions";

const POSOW_Read = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchSpecificPO_SOW(id));
    }
  }, [id]);
  return <CapturePO_SOW editBtn={true} toggleState={false} />;
};

export default POSOW_Read;
