import axios from "axios";
export const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;
export const COURSES_API = `${HTTP_SERVER}/api/courses`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findMyCourses = async () => {
  try {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
  } catch (error: any) {
    console.error("API call failed:", error);
    throw error;
  }
};

export const findModulesForCourse = async (courseId: string) => {
  try {
    const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
    return data;
  } catch (error: any) {
    console.error("Find modules for course failed:", error);
    throw error;
  }
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  try {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, module);
    return data;
  } catch (error: any) {
    console.error("Create module for course failed:", error);
    throw error;
  }
};

export const createCourse = async (course: any) => {
  try {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}`, course);
    return data;
  } catch (error: any) {
    console.error("Create course failed:", error);
    throw error;
  }
};

export const updateCourse = async (courseId: string, courseUpdates: any) => {
  try {
    const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}`, courseUpdates);
    return data;
  } catch (error: any) {
    console.error("Update course failed:", error);
    throw error;
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
    return true;
  } catch (error: any) {
    console.error("Delete course failed:", error);
    throw error;
  }
};

export const signin = async (credentials: any) => {
    try {
        const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
        return response.data;
    } catch (error: any) {
        console.error("Signin failed:", error);
        throw error;
    }
};

export const signup = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
};

export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};


