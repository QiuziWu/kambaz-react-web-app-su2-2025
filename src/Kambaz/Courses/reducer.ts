import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    courses: [],
    currentCourse: null
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addCourse: (state, { payload: course }) => {
            const newCourse: any = {
                _id: uuidv4(),
                name: course.name,
                number: course.number,
                startDate: course.startDate,
                endDate: course.endDate,
                description: course.description,
                image: course.image || "/images/reactjs.jpg",
                department: course.department || "D123",
                credits: course.credits || 3,
            };
            state.courses = [...state.courses, newCourse] as any;
        },
        deleteCourse: (state, { payload: courseId }) => {
            state.courses = state.courses.filter(
                (c: any) => c._id !== courseId
            );
        },
        updateCourse: (state, { payload: course }) => {
            state.courses = state.courses.map((c: any) =>
                c._id === course._id ? course : c
            ) as any;
        },
        setCurrentCourse: (state, { payload: course }) => {
            state.currentCourse = course;
        },
        setCourses: (state, { payload: courses }) => {
            state.courses = courses;
        },
    },
});

export const { addCourse, deleteCourse, updateCourse, setCurrentCourse, setCourses } =
    coursesSlice.actions;
export default coursesSlice.reducer; 