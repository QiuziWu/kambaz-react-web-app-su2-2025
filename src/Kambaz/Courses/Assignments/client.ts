import axios from "axios";

const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER || "http://localhost:4000";
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findAllAssignments = async () => {
    try {
        const { data } = await axiosWithCredentials.get(ASSIGNMENTS_API);
        return data;
    } catch (error: any) {
        console.error("Find all assignments failed:", error);
        throw error;
    }
};

export const findAssignmentsForCourse = async (courseId: string) => {
    try {
        const { data } = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/course/${courseId}`);
        return data;
    } catch (error: any) {
        console.error("Find assignments for course failed:", error);
        throw error;
    }
};

export const findAssignmentById = async (assignmentId: string) => {
    try {
        const { data } = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/${assignmentId}`);
        return data;
    } catch (error: any) {
        console.error("Find assignment by ID failed:", error);
        throw error;
    }
};

export const createAssignment = async (assignment: any) => {
    try {
        const { data } = await axiosWithCredentials.post(ASSIGNMENTS_API, assignment);
        return data;
    } catch (error: any) {
        console.error("Create assignment failed:", error);
        throw error;
    }
};

export const updateAssignment = async (assignmentId: string, assignmentUpdates: any) => {
    try {
        const { data } = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignmentId}`, assignmentUpdates);
        return data;
    } catch (error: any) {
        console.error("Update assignment failed:", error);
        throw error;
    }
};

export const deleteAssignment = async (assignmentId: string) => {
    try {
        await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
        return true;
    } catch (error: any) {
        console.error("Delete assignment failed:", error);
        throw error;
    }
}; 