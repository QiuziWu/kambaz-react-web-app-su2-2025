import GreenCheckmark from "./GreenCheckmark";
import { GoPlus } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons(
    { moduleId, deleteModule, editModule }: {
        moduleId: string; deleteModule: (moduleId: string) => void;
        editModule: (moduleId: string) => void
    }) {
    return (
        <div className="float-end">
            <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
            <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} />
            <GreenCheckmark />
            <GoPlus className="me-1 fs-3" />
            <HiOutlineDotsVertical />
        </div>
    );
}