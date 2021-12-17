import { CapturePO_SOW } from "../../components/CMS/POSOW_FORM/CapturePO_SOW";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchSpecificPO_SOW } from "../../store/CMS/POSOW-actions";
import React from "react";

const POSOW_EDIT = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchSpecificPO_SOW(id));
    }
  }, [id]);
  return <CapturePO_SOW editBtn={true} toggleState={true} />;
};

export default POSOW_EDIT;
