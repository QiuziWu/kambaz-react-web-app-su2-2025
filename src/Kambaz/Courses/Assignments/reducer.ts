import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    assignments: db.assignments,
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
            const newAssignment = {
                _id: uuidv4(),
                title: assignment.title,
                description: assignment.description,
                course: assignment.course,
                points: assignment.points,
                due: assignment.due,
                available: assignment.available,
                duedate: assignment.duedate,
                availabledate: assignment.availabledate,
            };
            state.assignments = [...state.assignments, newAssignment];
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== assignmentId
            );
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a) =>
                a._id === assignment._id ? assignment : a
            );
        },
    },
});

export const {
    addAssignment,
    deleteAssignment,
    updateAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
