import React from "react";
import "./pdfTemplate.styles.css";

const PdfTemplate = ({ viewedEmployee }) => {
  return (
    <div id="pdf">
      <div id="outer">
        <div id="left-bar">
          <div id="imag"></div>
          <br></br>
          <div id="contentbox">
            <div id="content-box2">
              <p id="title2">ID:</p>
              <p id="content1">{viewedEmployee.empId}</p>
            </div>
            <div id="content-box2">
              <p id="title2">Department: </p>
              <p id="content1">{viewedEmployee.empDepartment}</p>
            </div>
            <div id="content-box2">
              <p id="title2">Designation: </p>
              <p id="content1">{viewedEmployee.empDesignation}</p>
            </div>
            <br></br>
            <p id="title2">Primary Capability: </p>
            <div id="chip-box">
              {viewedEmployee.empPrimaryCapability.map((data, i) => (
                <div id="chip" key={i}>
                  {data}
                </div>
              ))}
            </div>
            <br></br>
            <p id="title2">Hobbies:</p>
            <div id="chip-box">
              {viewedEmployee.empHobbies.map((data, i) => (
                <div id="chip" key={i}>
                  {data}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="right-bar">
          <div id="content-box">
            <p id="title1">{viewedEmployee.empName}</p>
            <p id="email">{viewedEmployee.empEmail}</p>
            <p id="subtitle">
              {viewedEmployee.empCurrentAddress.empAddressCity},{" "}
              {viewedEmployee.empCurrentAddress.empAddressState}
            </p>
            <br></br>
            <p id="title3">About Me</p>
            <p id="abttme">{viewedEmployee.empAboutMe}</p>
            <br></br>
            <p id="title3">Personal Details</p>
            <div id="line"></div>
            <div id="contentbox">
              <div id="content-box2">
                <p id="title2">Personal Email: </p>
                <p id="email2">{viewedEmployee.empPersonalEmail}</p>
              </div>
              <div id="content-box2">
                <p id="title2">Date of birth: </p>
                <p id="content1">
                  {new Date(viewedEmployee.empDob).toDateString().slice(4)}
                </p>
              </div>
              <div id="content-box2">
                <p id="content1">
                  <strong>Residential Address: </strong>
                  {viewedEmployee.empResidentialAddress.empAddressLineOne},{" "}
                  {viewedEmployee.empResidentialAddress.empAddressCity}.{" "}
                  {viewedEmployee.empResidentialAddress.empAddressState}
                </p>
              </div>
              {viewedEmployee.personalDetails &&
                viewedEmployee.personalDetails.map((data, i) => (
                  <div id="content-box2" key={i}>
                    <p id="title2">{data.fieldName}:</p>
                    {data.fieldType === "date" ? (
                      <p id="content1">
                        {new Date(data.fieldValue).toDateString().slice(4)}
                      </p>
                    ) : (
                      <p id="content1">{data.fieldValue}</p>
                    )}
                  </div>
                ))}
              <br></br>
              <p id="title3">Professional Details</p>
              <div id="line"></div>
              <div id="content-box2">
                <p id="title2">
                  <strong>Graduation: </strong>
                </p>
                <p id="content1">{viewedEmployee.empGraduation}</p>
              </div>
              <div id="content-box2">
                <p id="content1">
                  <strong>Graduation University: </strong>
                  {viewedEmployee.empGraduationUniversity}
                </p>
              </div>
              <div id="content-box2">
                <p id="title2">Post Graduation: </p>
                <p id="content1">{viewedEmployee.empPostGraduation}</p>
              </div>
              <div id="content-box2">
                <p id="content1">
                  <strong>Post Graduation University: </strong>
                  {viewedEmployee.empPostGraduationUniversity}
                </p>
              </div>
              {viewedEmployee.professionalDetails &&
                viewedEmployee.professionalDetails.map((data, i) => (
                  <div id="content-box2" key={i}>
                    <p id="title2">{data.fieldName}:</p>
                    {data.fieldType === "date" ? (
                      <p id="content1">
                        {new Date(data.fieldValue).toDateString().slice(4)}
                      </p>
                    ) : (
                      <p id="content1">{data.fieldValue}</p>
                    )}
                  </div>
                ))}
              <br></br>
              <p id="title3">Skills and Qualifications</p>
              <div id="line"></div>
              <div id="content-box2">
                <p id="title2">Skill Set: </p>
                <p id="content1">{viewedEmployee.empSkillSet.join(", ")}</p>
              </div>
              <div id="content-box2">
                <p id="title2">Certifications: </p>
                <p id="content1">
                  {viewedEmployee.empCertifications.join(", ")}
                </p>
              </div>
              {viewedEmployee.skillsDetails &&
                viewedEmployee.skillsDetails.map((data, i) => (
                  <div id="content-box2" key={i}>
                    <p id="title2">{data.fieldName}:</p>
                    {data.fieldType === "date" ? (
                      <p id="content1">
                        {new Date(data.fieldValue).toDateString().slice(4)}
                      </p>
                    ) : (
                      <p id="content1">{data.fieldValue}</p>
                    )}
                  </div>
                ))}
              <br></br>
              {viewedEmployee.project && (
                <div>
                  <p id="title3">Projects</p>
                  <div id="line"></div>
                  {viewedEmployee.project.map((el, i) => (
                    <div class="project-box" key={i}>
                      <div id="content-box2">
                        <p id="title2">Project Name: </p>
                        <p id="content1">{el.projectName}</p>
                      </div>
                      <div id="content-box2">
                        <p id="title2">Skill Set: </p>
                        <p id="content1">{el.projectSkill.join(", ")}</p>
                      </div>
                      <div id="content-box2">
                        <p id="content1">
                          <strong>Project Description: </strong>
                          {el.projectDescription}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfTemplate;
