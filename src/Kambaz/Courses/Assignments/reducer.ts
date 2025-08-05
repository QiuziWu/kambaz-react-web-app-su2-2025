import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Assignment {
    _id: string;
    title: string;
    description: string;
    course: string;
    points: number;
    due: string;
    available: string;
    duedate: string;
    availabledate: string;
}

interface AssignmentState {
    assignments: Assignment[];
}

const initialState: AssignmentState = {
    assignments: [],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action: PayloadAction<Assignment[]>) => {
            state.assignments = action.payload;
        },
        addAssignment: (state, action: PayloadAction<Omit<Assignment, '_id'>>) => {
            const newAssignment: Assignment = {
                _id: uuidv4(),
                title: action.payload.title,
                description: action.payload.description,
                course: action.payload.course,
                points: action.payload.points,
                due: action.payload.due,
                available: action.payload.available,
                duedate: action.payload.duedate,
                availabledate: action.payload.availabledate,
            };
            state.assignments = [...state.assignments, newAssignment];
        },
        deleteAssignment: (state, action: PayloadAction<string>) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action: PayloadAction<Assignment>) => {
            state.assignments = state.assignments.map((a) =>
                a._id === action.payload._id ? action.payload : a
            );
        },
    },
});

export const {
    setAssignments,
    addAssignment,
    deleteAssignment,
    updateAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
