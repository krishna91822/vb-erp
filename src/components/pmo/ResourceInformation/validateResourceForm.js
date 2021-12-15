export default function validateResourceForm(data) {
  let errors = {};

  if (!data.empName || data.empName.trim() === "Invalid") {
    errors.empName = "Associate Name Required";
  }

  if (!data.allocationStartDate.trim()) {
    errors.allocationStartDate = "Start Date Required";
  }
  if (!data.allocationEndDate.trim()) {
    errors.allocationEndDate = "End Date Required";
  } else if (data.allocationStartDate > data.allocationEndDate) {
    errors.allocationEndDate = "End Date need to be grater than Start Date";
  }

  if (data.allocationPercentage === "0") {
    errors.allocationPercentage = "allocation Required";
  }
  if (!data.rackRate.trim()) {
    errors.rackRate = "RackRate Required";
  }

  return errors;
}
