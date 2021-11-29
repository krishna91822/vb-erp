export default function validateResourceForm(data) {
  let errors = {};

  if (!data.associateName.trim()) {
    errors.associateName = "Associate Name Required";
  }

  if (!data.startDate.trim()) {
    errors.startDate = "Start Date Required";
  }
  if (!data.endDate.trim()) {
    errors.endDate = "End Date Required";
  } else if (data.startDate > data.endDate) {
    errors.endDate = "End Date need to be grater than Start Date";
  }

  if (data.allocation === "0") {
    errors.allocation = "allocation Required";
  }
  if (!data.rackRate.trim()) {
    errors.rackRate = "RackRate Required";
  }

  return errors;
}
