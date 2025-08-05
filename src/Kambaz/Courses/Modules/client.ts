import axios from "axios";
const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const deleteModule = async (moduleId: string) => {
    try {
        await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
        return true;
    } catch (error: any) {
        console.error("Delete module failed:", error);
        throw error;
    }
};

export const updateModule = async (module: any) => {
    try {
        const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
        return data;
    } catch (error: any) {
        console.error("Update module failed:", error);
        throw error;
    }
};
  

