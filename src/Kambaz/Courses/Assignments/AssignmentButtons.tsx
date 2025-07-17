import { HiOutlineDotsVertical } from "react-icons/hi";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function AssignmentButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <HiOutlineDotsVertical />
        </div>
    );
}