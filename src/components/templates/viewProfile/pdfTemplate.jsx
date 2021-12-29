const pdfTemplate = (viewedEmployee) => `
<body id=pdf>
    <div id=outer>
        <div id=left-bar>
            <div id=imag></div>
            <br>
            <div id=contentbox>
                <div id=content-box2>
                    <p id=title2>ID:</p>
                    <p id=content1>${viewedEmployee.empId}</p>
                </div>
                <div id=content-box2>
                    <p id=title2>Department: </p>
                    <p id=content1>${viewedEmployee.empDepartment}</p>
                </div>
                <div id=content-box2>
                    <p id=title2>Designation: </p>
                    <p id=content1>${viewedEmployee.empDesignation}</p>
                </div>
                <br>
                <p id=title2>Primary Capability: </p>
                <div id=chip-box>
                ${viewedEmployee.empPrimaryCapability
                  .map((data, i) => `<div id=chip>${data}</div>`)
                  .join(" ")}
                </div>
                <br>
                <p id=title2>Hobbies:</p>
                <div id=chip-box>
                ${viewedEmployee.empHobbies
                  .map((data, i) => `<div id=chip>${data}</div>`)
                  .join(" ")}
                </div>
            </div>
        </div>
        <div id=right-bar>
            <div id=content-box>
                <p id=title1>${viewedEmployee.empName}</p>
                <p id=email>${viewedEmployee.empEmail}</p>
                <p id=subtitle>${
                  viewedEmployee.empCurrentAddress.empAddressCity
                }, ${viewedEmployee.empCurrentAddress.empAddressState}</p>
                <br>
                <p id=title3>About Me</p>
                <p id=abttme>${viewedEmployee.empAboutMe}
                <br></br>
                <p id=title3>Personal Details</p>
                <div id=line></div>
                <div id=contentbox>
                <div id=content-box2>
                    <p id=title2>Personal Email: </p>
                    <p id=email2>${viewedEmployee.empPersonalEmail}</p>
                </div>
                <div id=content-box2>
                    <p id=title2>Date of birth: </p>
                    <p id=content1>${new Date(viewedEmployee.empDob)
                      .toDateString()
                      .slice(4)}</p>
                </div>
                <div id=content-box2>
                    <p id=content1><strong>Residential Address: </strong>${
                      viewedEmployee.empResidentialAddress.empAddressLineOne
                    }, ${
  viewedEmployee.empResidentialAddress.empAddressCity
}. ${viewedEmployee.empResidentialAddress.empAddressState}</p>
                </div>
                ${
                  viewedEmployee.personalDetails ? (
                    viewedEmployee.personalDetails
                      .map(
                        (data) =>
                          `<div id=content-box2><p id=title2>${
                            data.fieldName
                          }:</p>
                          ${
                            data.fieldType === "date"
                              ? `<p id=content1>${new Date(data.fieldValue)
                                  .toDateString()
                                  .slice(4)}</p>`
                              : `<p id=content1>${data.fieldValue}</p>`
                          }</div>`
                      )
                      .join(" ")
                  ) : (
                    <></>
                  )
                }
                <br>
                <p id=title3>Professional Details</p>
                <div id=line></div>
                <div id=content-box2>
                    <p id=title2><strong>Graduation: </strong>
                    <p id=content1>${viewedEmployee.empGraduation}</p>
                </div>
                <div id=content-box2>
                    <p id=content1><strong>Graduation University: </strong>${
                      viewedEmployee.empGraduationUniversity
                    }</p>
                </div>
                <div id=content-box2>
                    <p id=title2>Post Graduation: </p>
                    <p id=content1>${viewedEmployee.empPostGraduation}</p>
                </div>
                <div id=content-box2>
                    <p id=content1><strong>Post Graduation University: </strong>${
                      viewedEmployee.empPostGraduationUniversity
                    }</p>
                </div>
                ${
                  viewedEmployee.professionalDetails ? (
                    viewedEmployee.professionalDetails
                      .map(
                        (data) =>
                          `<div id=content-box2><p id=title2>${
                            data.fieldName
                          }:</p>
                          ${
                            data.fieldType === "date"
                              ? `<p id=content1>${new Date(data.fieldValue)
                                  .toDateString()
                                  .slice(4)}</p>`
                              : `<p id=content1>${data.fieldValue}</p>`
                          }</div>`
                      )
                      .join(" ")
                  ) : (
                    <></>
                  )
                }
                <br>
                <p id=title3>Skills and Qualifications</p>
                <div id=line></div>
                <div id=content-box2>
                    <p id=title2>Skill Set: </p>
                    <p id=content1>${viewedEmployee.empSkillSet}</p>
                </div>
                <div id=content-box2>
                    <p id=title2>Certifications: </p>
                    <p id=content1>${viewedEmployee.empCertifications}</p>
                </div>
                ${
                  viewedEmployee.skillsDetails ? (
                    viewedEmployee.skillsDetails
                      .map(
                        (data) =>
                          `<div id=content-box2><p id=title2>${
                            data.fieldName
                          }:</p>
                          ${
                            data.fieldType === "date"
                              ? `<p id=content1>${new Date(data.fieldValue)
                                  .toDateString()
                                  .slice(4)}</p>`
                              : `<p id=content1>${data.fieldValue}</p>`
                          }</div>`
                      )
                      .join(" ")
                  ) : (
                    <></>
                  )
                }
            </div>
        </div>
    </div>
</body>

  <style>
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body#pdf{
        background-color: red;
    }

    div#content-box{
        width: 278px;
    }

    div#content-box2{
        display: flex;

    }

    div#outer{
        display: flex;
    }

    div#left-bar{
        height: 631px;
        width: 150px;
        background-color: #ccc;
        padding: 10px;
    }

    div#imag{
        height: 110px;
        width: 110px;
        border-radius: 50%;
        margin: 10px;
        background-color: cyan;
    }

    div#right-bar{
        margin-top: 20px;
        height: 611px;
        width: 298px;
        padding: 10px;
    }

    div#line{
      width: 280px;
      height: 1px;
      border-radius: 40%;
      background-color: #5C5B5B;
    }

    p#content1{
        font-size: 8.5px;
        text-transform: capitalize;
    }

    p#abttme{
        font-size: 8.5px;
        text-align: justify;
    }

    p#title2{
        margin-right: 2px;
        font-size: 8.5px;
        font-weight: bold;
        text-transform: capitalize;
    }

    p#title1{
        font-weight: bold;
        font-size: 16px;
        text-transform: capitalize;
    }

    p#title3{
        font-weight: bold;
        font-size: 10px;
    }

    p#email{
        font-size: 8.5px;
    }

    p#email2{
        font-size: 8.5px;
    }

    p#subtitle{
        font-size: 7px;
        color: #8a867c;
        text-transform: capitalize;
    }


    div#chip{
        display: inline-flex;
        height: 14px;
        font-size: 8.5px;
        padding-left: 3px;
        padding-right: 3px;
        margin-right: 3px;
        margin-bottom: 3px;
        border-radius: 7px;
        background-color: #5C5B5B;
        text-transform: capitalize;
        color: white;
    }

    div#chip-box{
        padding-top: 3px;
        display: flex;
        flex-wrap: wrap;
    }
  </style>
`;
export default pdfTemplate;
