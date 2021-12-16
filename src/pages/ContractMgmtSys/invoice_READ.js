import Invoice from "../../components/CMS/invoice_FORM/Invoice";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { fetchSpecificINVOICE } from "../../store/CMS/INVOICE-actions";

const INVOICE_Read = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchSpecificINVOICE(id));
    }
  }, [id]);
  return <Invoice editBtn={true} toggleState={false} />;
};

export default INVOICE_Read;
