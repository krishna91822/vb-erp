export default function validateForm(data) {
  let errors = {};

  if (!data.clientName && data.clientName === "") {
    errors.clientName = "Client Name Required";
  }
  if (!data.projectName.trim()) {
    errors.projectName = "Project Name Required";
  }
  if (!data.clientProjectManager.trim()) {
    errors.clientProjectManager = "Client Project Manager Required";
  }
  // if (data.clientPrimaryContact.toString().length !== 10) {
  //   errors.clientPrimaryContact = "Enter valid number";
  // }
  if (!data.clientProjectSponsor.trim()) {
    errors.clientProjectSponsor = "Client Project Sponsor Required";
  }
  if (!data.clientFinanceController.trim()) {
    errors.clientFinanceController = "Client Finance Controller Required";
  }
  if (data.vbProjectStatus !== "Yet to Begin") {
    if (!data.startDate.trim()) {
      errors.startDate = "Start Date Required";
    }
    if (!data.endDate.trim()) {
      errors.endDate = "End Date Required";
    } else if (data.startDate > data.endDate) {
      errors.endDate = "End Date need to be grater than Start Date";
    }
  }

  if (!data.vbProjectManager.trim()) {
    errors.vbProjectManager = "VB Project Manager Required";
  }
  if (!data.vbProjectStatus.trim()) {
    errors.vbProjectStatus = "Project Status Required";
  }

  return errors;
}
