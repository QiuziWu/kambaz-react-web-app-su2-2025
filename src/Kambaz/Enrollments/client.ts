import axios from "axios";

const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findAllEnrollments = async () => {
    try {
        const { data } = await axiosWithCredentials.get(ENROLLMENTS_API);
        return data;
    } catch (error: any) {
        console.error("Find all enrollments failed:", error);
        throw error;
    }
};

export const findEnrollmentsForUser = async (userId: string) => {
    try {
        const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/user/${userId}`);
        return data;
    } catch (error: any) {
        console.error("Find enrollments for user failed:", error);
        throw error;
    }
};

export const findEnrollmentsForCourse = async (courseId: string) => {
    try {
        const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/course/${courseId}`);
        return data;
    } catch (error: any) {
        console.error("Find enrollments for course failed:", error);
        throw error;
    }
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
    try {
        const { data } = await axiosWithCredentials.post(ENROLLMENTS_API, {
            user: userId,
            course: courseId
        });
        return data;
    } catch (error: any) {
        console.error("Enroll user in course failed:", error);
        throw error;
    }
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
    try {
        await axiosWithCredentials.delete(`${ENROLLMENTS_API}/user/${userId}/course/${courseId}`);
        return true;
    } catch (error: any) {
        console.error("Unenroll user from course failed:", error);
        throw error;
    }
};

export const isUserEnrolledInCourse = async (userId: string, courseId: string) => {
    try {
        const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/user/${userId}/course/${courseId}/check`);
        return data.enrolled;
    } catch (error: any) {
        console.error("Check enrollment status failed:", error);
        throw error;
    }
}; 