import axios from "axios";
import { pmoActions } from "./pmo-slice";
const baseUrl = "http://localhost:3030";

export const createProject = (projectInfo) => {
  return async (dispatch) => {
    const saveProjects = async () => {
      const response = await axios.post(
        `${baseUrl}/projects`,
        projectInfo.project
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    const saveResources = async (id) => {
      const Allresources = {
        projectId: id,
        resources: projectInfo.resources,
      };
      const response = await axios.post(`${baseUrl}/allocations`, Allresources);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await saveProjects();
      await saveResources(data.data._id);
      dispatch(pmoActions.redirectToProjectList());
    } catch (err) {
      console.log(err);
    }
  };
};
export const updateProject = (projectInfo) => {
  return async (dispatch) => {
    const saveProjects = async () => {
      const response = await axios.put(
        `${baseUrl}/projects/${projectInfo.project.vbProjectId}`,
        projectInfo.project
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    const saveResources = async (id) => {
      const resources = {
        projectId: id,
        resources: projectInfo.resources,
      };
      const response = await axios.put(`${baseUrl}/allocations`, resources);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await saveProjects();
      await saveResources(data.data._id);
      dispatch(pmoActions.setUpdateModal());
    } catch (err) {
      console.log(err);
    }
  };
};
export const getAllProjects = (type) => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(`${baseUrl}/projects/${type}`);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateProjectsList(data.data.data.results));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllFilterProjects = (type, filters) => {
  return async (dispatch) => {
    const getData = async () => {
      let url = `${baseUrl}/projects/${type}?limit=10`;
      if (filters.clientName) url += `&clientName=${filters.clientName}`;
      if (filters.projectName) url += `&projectName=${filters.projectName}`;
      if (filters.vbProjectId) url += `&vbProjectId=${filters.vbProjectId}`;
      if (filters.vbProjectStatus)
        url += `&vbProjectStatus=${filters.vbProjectStatus}`;
      const response = await axios.get(url);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateProjectsList(data.data.data.results));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllEmployees = (empName) => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(
        `${baseUrl}/employees/filteremp?empName=${empName}`
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateEmployeeList(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};
export const getAllClientData = (value) => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(
        `${baseUrl}/cims/filterclients?brandName=${value}`
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateClientList(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllocatedData = (filters) => {
  return async (dispatch) => {
    const getData = async () => {
      let url = `${baseUrl}/allocations?limit=10`;
      if (filters.empId) url += `&empId=${filters.empId}`;
      if (filters.employeeName) url += `&empName=${filters.employeeName}`;
      if (filters.projectAllocated)
        url += `&allocatedProject=${filters.projectAllocated}`;
      if (filters.allocationStartDate)
        url += `&allocationStartDate=${filters.allocationStartDate}`;
      if (filters.allocationEndDate)
        url += `&allocationEndDate=${filters.allocationEndDate}`;
      if (filters.allocationPercentage)
        url += `&allocationPercentage=${filters.allocationPercentage}`;

      const response = await axios.get(url);

      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateAllocatedData(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOnBench = (filters) => {
  return async (dispatch) => {
    const getData = async () => {
      let url = `${baseUrl}/allocations/onbench?limit=10`;
      if (filters.empId) url += `&empId=${filters.empId}`;
      if (filters.employeeName) url += `&empName=${filters.employeeName}`;
      if (filters.remainingAllocation)
        url += `&remainingAllocation=${filters.remainingAllocation}`;

      const response = await axios.get(url);

      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updatebenchData(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPercentageAllocated = (empId) => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(
        `${baseUrl}/allocations/totalallocation?empId=${empId}`
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updatePercentageAllocated(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProjectById = (projectId) => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(`${baseUrl}/projects/${projectId}`);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    const getResourceData = async (projId) => {
      const response = await axios.get(
        `${baseUrl}/allocations?projectId=${projId}`
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      const resourceData = await getResourceData(data.data[0]._id);
      const allData = {
        project: data.data[0],
        resources: resourceData.data,
      };
      dispatch(pmoActions.updateProjectById(allData));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteResource = (id) => {
  return async (dispatch) => {
    const deleteResourceById = async () => {
      const response = await axios.delete(`${baseUrl}/allocations/${id}`);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await deleteResourceById();
      // dispatch(pmoActions.removeAllocation(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllProjectsBySroting = (type, sortedValue) => {
  console.log(type, sortedValue);
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(
        `${baseUrl}/projects/${type}/${sortedValue}`
      );
      console.log(`${baseUrl}/${type}`);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateProjectsList(data.data.data.results));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getClinetById = (id) => {
  return async (dispatch) => {
    const getClinentName = async () => {
      const response = await axios.get(`${baseUrl}/cims/filterclients/${id}`);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getClinentName();
      dispatch(pmoActions.updateClientNames(data.data[0].contacts));
    } catch (err) {
      console.log(err);
    }
  };
};
