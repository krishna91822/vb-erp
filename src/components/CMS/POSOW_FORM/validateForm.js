export default function validateForm(data) {
  let errors = {};

  function isAlphaNumeric(testVal) {
    var val = testVal;
    var RegEx = /^[a-z0-9]+$/i;
    var Valid = RegEx.test(val);
    return Valid;
  }
  if (!data.Client_Name.trim()) {
    errors.Client_Name = "Client Name is Required";
  }
  if (!data.Project_Name.trim()) {
    errors.Project_Name = "Project Name is Required";
  }
  if (!data.Type.trim()) {
    errors.Type = "Type of Doc(PO/SOW) is required";
  }
  if (!data.Document_Name.trim()) {
    errors.Document_Name = "Document name is required";
  }
  if (!data.PO_Amount) {
    errors.PO_Amount = "PO amount is required";
  }
  if (!data.Currency.trim()) {
    errors.Currency = "Currency name is required";
  }

  if (!data.POSOW_endDate) {
    errors.Remarks = "POSOW end date is required are required";
  }
  if (data.Client_Sponser.length === 0) {
    errors.Client_Sponser = "At least one client sponsor needs to be selected";
  }
  if (data.Client_Finance_Controller.length === 0) {
    errors.Client_Finance_Controller =
      "At least one client sponsor needs to be selected";
  }
  if (data.Targetted_Resources.length === 0) {
    errors.Targetted_Resources =
      "At least one client sponsor needs to be selected";
  }

  return errors;
}
