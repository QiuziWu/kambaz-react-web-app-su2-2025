import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
    enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: enrollment }) => {
            const newEnrollment: any = {
                _id: Date.now().toString(),
                user: enrollment.user,
                course: enrollment.course,
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        deleteEnrollment: (state, { payload: enrollmentId }) => {
            state.enrollments = state.enrollments.filter(
                (e: any) => e._id !== enrollmentId
            );
        },
        toggleEnrollment: (state, { payload: { userId, courseId } }) => {
            const existingEnrollment = state.enrollments.find(
                (e: any) => e.user === userId && e.course === courseId
            );
            
            if (existingEnrollment) {
                // Remove enrollment
                state.enrollments = state.enrollments.filter(
                    (e: any) => e._id !== existingEnrollment._id
                );
            } else {
                // Add enrollment
                const newEnrollment: any = {
                    _id: Date.now().toString(),
                    user: userId,
                    course: courseId,
                };
                state.enrollments = [...state.enrollments, newEnrollment] as any;
            }
        },
    },
});

export const { addEnrollment, deleteEnrollment, toggleEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer; 