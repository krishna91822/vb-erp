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
        project_id: id,
        resources: projectInfo.resources,
      };
      const response = await axios.post(`${baseUrl}/allocations`, Allresources);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    // const saveResource = async () => {
    //   const response = await axios.post(`${baseUrl}/projects`, projectInfo);
    //   if (response.status === "failure") {
    //     throw new Error(response.data.message);
    //   }
    //   return response;
    // };
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
    // const saveResources = async (id) => {
    //   const resources = {
    //     projectId: id,
    //     resources: projectInfo.resources,
    //   };
    //   const response = await axios.post(`${baseUrl}/resources`, resources);
    //   if (response.status === "failure") {
    //     throw new Error(response.data.message);
    //   }
    //   return response;
    // };
    try {
      const data = await saveProjects();
      // await saveResources(data._id);
      dispatch(pmoActions.setUpdateModal());
    } catch (err) {
      console.log(err);
    }
  };
};
export const getAllProjects = () => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(`${baseUrl}/projects`);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateProjectsList(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllEmployees = () => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(`${baseUrl}/employees`);
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
        `${baseUrl}/allocations?project_id=${projId}`
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
        resources: resourceData.data[0].resources,
      };
      dispatch(pmoActions.updateProjectById(allData));
    } catch (err) {
      console.log(err);
    }
  };
};
