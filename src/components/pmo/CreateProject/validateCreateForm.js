export default function validateForm(data) {
  let errors = {};

  if (!data.clientName.trim()) {
    errors.clientName = "Client Name Required";
  }
  if (!data.projectName.trim()) {
    errors.projectName = "Project Name Required";
  }
  if (!data.clientProjectManager.trim()) {
    errors.clientProjectManager = "Client Project Manager Required";
  }
  if (data.clientPrimaryContact && data.clientPrimaryContact.length !== 10) {
    errors.clientPrimaryContact = "Enter valid number";
  }
  if (!data.clientProjectSponsor.trim()) {
    errors.clientProjectSponsor = "Client Project Sponsor Required";
  }
  if (!data.clientFinanceController.trim()) {
    errors.clientFinanceController = "Client Finance Controller Required";
  }
  if (!data.startDate.trim()) {
    errors.startDate = "Start Date Required";
  }
  if (!data.endDate.trim()) {
    errors.endDate = "End Date Required";
  } else if (data.startDate > data.endDate) {
    errors.endDate = "End Date need to be grater than Start Date";
  }
  if (!data.vbProjectManager.trim()) {
    errors.vbProjectManager = "vb Project Manager Required";
  }
  if (!data.vbProjectStatus.trim()) {
    errors.vbProjectStatus = "vb Project Status Required";
  }

  return errors;
}
