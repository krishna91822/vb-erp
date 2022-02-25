export const dataToCheck = (data) => {
  return {
    empName: data?.empName,
    empEmail: data?.empEmail,
    empDepartment: data?.empDepartment,
    empDesignation: data?.empDesignation,
    empDoj: data?.empDoj?.toString(),
    empDob: data?.empDob?.toString(),
    empReportingManager: data?.empReportingManager,
    empPersonalEmail: data?.empPersonalEmail,
    empAboutMe: data?.empAboutMe,
    empBand: data?.empBand,
    empCertifications: data?.empCertifications,
    empConnections: data?.empConnections,
    empCurrentAddress: data?.empCurrentAddress,
    empGraduation: data?.empGraduation,
    empGraduationUniversity: data?.empGraduationUniversity,
    empHobbies: data?.empHobbies,
    empSkillSet: data?.empSkillSet,
    empPrimaryCapability: data?.empPrimaryCapability,
    empPostGraduation: data?.empPostGraduation,
    empPostGraduationUniversity: data?.empPostGraduationUniversity,
    empResidentialAddress: data?.empResidentialAddress,
    project: data?.project,
    slackMemId: data?.slackMemId,
    yearsOfExperience: data?.yearsOfExperience,
  };
};

export const isFieldHasValue = (field) => {
  if (field === 0) return true;
  if (!field) return !!field;
  if (typeof field === "number") return !!field;
  if (typeof field === "string") return !!field;
  if (field.constructor === Object) return !!Object.keys(field).length;
  if (field.constructor === Array) return !!field.length;
  return false;
};

export const progressBarCalculation = (data) => {
  const dataForProgressBar = dataToCheck(data);
  let totalFields = Object.keys(dataForProgressBar).length;
  let fieldsWithValue = 0;
  Object.keys(dataForProgressBar).forEach((el) => {
    if (isFieldHasValue(dataForProgressBar[el])) fieldsWithValue += 1;
  });
  const percentage = Math.floor((fieldsWithValue / totalFields) * 100) * 1;
  return percentage;
};
