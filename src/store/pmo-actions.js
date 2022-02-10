import axios from "../helpers/axiosInstance";
import { pmoActions } from "./pmo-slice";
import { uiActions } from "./ui-slice";

export const createProject = (projectInfo) => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());
    const saveProjects = async () => {
      const response = await axios.post(`/projects`, projectInfo.project);
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
      const response = await axios.post(`/allocations`, Allresources);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await saveProjects();
      await saveResources(data.data._id);

      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Project Created Successfully !",
        })
      );
      dispatch(pmoActions.redirectToProjectList());
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const updateProject = (projectInfo) => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());
    const saveProjects = async () => {
      const response = await axios.put(
        `/projects/${projectInfo.project.vbProjectId}`,
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
      const response = await axios.put(`/allocations`, resources);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await saveProjects();
      await saveResources(data.data._id);

      dispatch(pmoActions.setUpdateModal());
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const getAllProjects = (type, pageNo) => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());
    const getData = async () => {
      const response = await axios.get(
        `/projects/${type}?limit=10&page=${pageNo}`
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateProjectsList(data.data.data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const getAllFilterProjects = (type, filters) => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());
    const getData = async () => {
      let url = `/projects/${type}?limit=10`;
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
      dispatch(pmoActions.updateProjectsList(data.data.data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const getAllEmployees = (empName) => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(
        `/allocations/filteremp?empName=${empName}`
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateEmployeeList(data.data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    }
  };
};

export const getAllClientData = (value) => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(
        `/cims/filterclients?brandName=${value}`
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateClientList(data.data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    }
  };
};

export const getAllocatedData = (filters, pageNo, sortedValue) => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());
    const getData = async () => {
      let url = `/allocations/allocated/${sortedValue}?limit=10&page=${pageNo}`;
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
      dispatch(pmoActions.updateAllocatedData(data.data.data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const getOnBench = (filters, pageNo, sortedValue) => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());

    const getData = async () => {
      let url = `/allocations/onbench/${sortedValue}?limit=10&page=${pageNo}`;
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
      dispatch(pmoActions.updatebenchData(data.data.data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const getPercentageAllocated = (empId) => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(
        `/allocations/totalallocation?empId=${empId}`
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updatePercentageAllocated(data.data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    }
  };
};

export const getProjectById = (projectId) => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());

    const getData = async () => {
      const response = await axios.get(`/projects/${projectId}`);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    const getResourceData = async (projId) => {
      const response = await axios.get(
        `/allocations/allocated?projectId=${projId}`
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
        resources: resourceData.data.data.results,
      };
      dispatch(pmoActions.updateProjectById(allData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const deleteResource = (id) => {
  return async (dispatch) => {
    const deleteResourceById = async () => {
      const response = await axios.delete(`/allocations/${id}`);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      await deleteResourceById();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    }
  };
};

export const getAllProjectsBySroting = (type, sortedValue) => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());

    const getData = async () => {
      const response = await axios.get(`/projects/${type}/${sortedValue}`);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateProjectsList(data.data.data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const getClinetById = (id) => {
  return async (dispatch) => {
    const getClinentName = async () => {
      const response = await axios.get(`/cims/filterclients/${id}`);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getClinentName();
      dispatch(pmoActions.updateClientNames(data.data[0].contacts));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    }
  };
};

export const searchVbManager = (empName) => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(
        `allocations/managers?empName=${empName}`
        // `/employees/empManagers`
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateVbManagers(data.data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    }
  };
};
