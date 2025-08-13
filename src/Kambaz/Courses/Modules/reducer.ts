import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string;
}

interface Module {
    _id: string;
    lessons: Lesson[];
    name: string;
    course: string;
    editing?: boolean;
}

interface ModuleState {
    modules: Module[];
}

const initialState: ModuleState = {
    modules: [],
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        addModule: (state, action: PayloadAction<Omit<Module, '_id' | 'lessons'>>) => {
            const newModule: Module = {
                _id: uuidv4(),
                lessons: [],
                name: action.payload.name,
                course: action.payload.course,
            };
            state.modules = [...state.modules, newModule];
        },
        deleteModule: (state, action: PayloadAction<string>) => {
            state.modules = state.modules.filter(
                (m) => m._id !== action.payload);
        },
        updateModule: (state, action: PayloadAction<Module>) => {
            state.modules = state.modules.map((m) =>
                m._id === action.payload._id ? action.payload : m
            );
        },
        editModule: (state, action: PayloadAction<string>) => {
            state.modules = state.modules.map((m) =>
                m._id === action.payload ? { ...m, editing: true } : m
            );
        },
        setModules: (state, { payload: modules }) => {
            state.modules = modules;
          },
    },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } =
    modulesSlice.actions;
export default modulesSlice.reducer;

