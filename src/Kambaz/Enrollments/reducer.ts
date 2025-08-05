import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

interface EnrollmentState {
    enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
    enrollments: [],
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
            state.enrollments = action.payload;
        },
        addEnrollment: (state, action: PayloadAction<Omit<Enrollment, '_id'>>) => {
            const newEnrollment: Enrollment = {
                _id: Date.now().toString(),
                user: action.payload.user,
                course: action.payload.course,
            };
            state.enrollments = [...state.enrollments, newEnrollment];
        },
        deleteEnrollment: (state, action: PayloadAction<string>) => {
            state.enrollments = state.enrollments.filter(
                (e) => e._id !== action.payload
            );
        },
        toggleEnrollment: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
            const existingEnrollment = state.enrollments.find(
                (e) => e.user === action.payload.userId && e.course === action.payload.courseId
            );
            
            if (existingEnrollment) {
                // Remove enrollment
                state.enrollments = state.enrollments.filter(
                    (e) => e._id !== existingEnrollment._id
                );
            } else {
                // Add enrollment
                const newEnrollment: Enrollment = {
                    _id: Date.now().toString(),
                    user: action.payload.userId,
                    course: action.payload.courseId,
                };
                state.enrollments = [...state.enrollments, newEnrollment];
            }
        },
    },
});

export const { setEnrollments, addEnrollment, deleteEnrollment, toggleEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer; 