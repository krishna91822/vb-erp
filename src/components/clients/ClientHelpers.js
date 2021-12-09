import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { cimsActions } from "../../store/cims-slice";
import { useNavigate } from "react-router-dom";

const contactSchema = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  otherContactNumber: "",
};

export default function ClientHelpers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientsList, setClientsList] = useState([]);
  const [Comccode, setComCCode] = useState("in");
  const [Regccode, setRegCCode] = useState("in");
  const errors = useSelector((state) => state.cims.errors);

  async function fetchData() {
    const response = await fetch("http://localhost:4000/countries");
    const data = await response.json();
    if (data.code === 200 || data.status === "success")
      dispatch(cimsActions.setCountries(data.data));
    else console.log(data.error);
  }

  const getAddressByPincode = async (addType, pincode) => {
    const ccode = addType === "communicationAddress" ? Comccode : Regccode;
    try {
      await axios
        .get("http://localhost:4000/location", {
          headers: {
            pincode: pincode,
            country: ccode,
          },
        })
        .then((res) => {
          if (res.data.code === 200 || res.data.status === "success")
            addType === "communicationAddress"
              ? dispatch(cimsActions.setLocCom(res.data.data))
              : dispatch(cimsActions.setLocReg(res.data.data));
          else {
            window.alert(res.data.error[0].message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await axios
      .post("http://localhost:4000/login")
      .then((data) => data)
      .then((tokenObject) => {
        localStorage.setItem("authorization", tokenObject.data.Token);
      });
    const token = localStorage.getItem("authorization");
    fetchData();
    await axios
      .get("http://localhost:4000/cims", {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((data) => data)
      .then((list) => {
        if (list.data.code === 200 || list.data.status === "success")
          setClientsList(list.data.data);
        else console.log(list.data.error);
      });
  }, []);

  const handleClientData = async (clientId, mode) => {
    dispatch(cimsActions.resetForm());
    const token = localStorage.getItem("authorization");
    await axios
      .get("http://localhost:4000/getclientinfo", {
        headers: { authorization: `bearer ${token}`, id: clientId },
      })
      .then((clientdata) => clientdata)
      .then((clientInfo) => {
        dispatch(cimsActions.setNavigateBack(false));
        dispatch(cimsActions.getClientData(clientInfo.data.data[0]));
        const cccode =
          clientInfo.data.data[0].communicationAddress.country.split("-")[1];
        const rccode =
          clientInfo.data.data[0].registeredAddress.country.split("-")[1];
        setComCCode(cccode);
        setRegCCode(rccode);
        dispatch(cimsActions.setComCcode(cccode));
        dispatch(cimsActions.setRegCcode(rccode));
        dispatch(cimsActions.toggleEditMode(mode));
        getAddressByPincode(
          "registeredAddress",
          clientInfo.data.data[0].registeredAddress.pincode
        );
        getAddressByPincode(
          "communicationAddress",
          clientInfo.data.data[0].communicationAddress.pincode
        );
        if (Object.keys(clientInfo.data.data[0].contacts).length > 3) {
          var temp = JSON.parse(JSON.stringify(errors));
          for (
            let i = 0;
            i < Object.keys(clientInfo.data.data[0].contacts).length - 3;
            i++
          ) {
            temp.contacts[`otherContact${i + 1}`] = contactSchema;
          }
          dispatch(cimsActions.setErrors({ ...temp }));
        }
      });
    setTimeout(() => {
      navigate(`/cims/clientdetails/${clientId}`);
    }, 3000);
  };

  return { clientsList, handleClientData };
}
