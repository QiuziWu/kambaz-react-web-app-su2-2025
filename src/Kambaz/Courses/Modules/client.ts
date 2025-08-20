import axios from "axios";
const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER || "http://localhost:4000";
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const deleteModule = async (moduleId: string) => {
    try {
        console.log("Sending delete request for module:", moduleId);
        const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
        console.log("Delete response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Delete module failed:", error.response?.data || error.message);
        throw error;
    }
};

export const updateModule = async (module: any) => {
    try {
        console.log("Sending update request for module:", module._id, "with data:", module);
        const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
        console.log("Update response:", data);
        return data;
    } catch (error: any) {
        console.error("Update module failed:", error.response?.data || error.message);
        throw error;
    }
};
  

