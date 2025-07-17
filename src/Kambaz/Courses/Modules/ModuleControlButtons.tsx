import GreenCheckmark from "./GreenCheckmark";
import { GoPlus } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function ModuleControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <GoPlus className="me-1 fs-3" />
            <HiOutlineDotsVertical />
        </div>
    );
}