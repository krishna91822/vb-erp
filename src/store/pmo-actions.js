import axios from "axios";

import { pmoActions } from "./pmo-slice";

const baseUrl = "http://localhost:3030";

export const createProject = (projectInfo) => {
  return async (dispatch) => {
    const saveData = async () => {
      const response = await axios.post(`${baseUrl}/projects`, projectInfo);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    const saveResource = async () => {
      const response = await axios.post(`${baseUrl}/projects`, projectInfo);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      await saveData();
      await saveResource();
      dispatch(pmoActions.redirectToProjectList());
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProject = (projectInfo) => {
  return async (dispatch) => {
    const saveData = async () => {
      const response = await axios.put(
        `${baseUrl}/projects/${projectInfo.vbProjectId}`,
        projectInfo
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      await saveData();
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

export const getProjectById = (projectId) => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(`${baseUrl}/projects/${projectId}`);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(pmoActions.updateProjectById(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};
