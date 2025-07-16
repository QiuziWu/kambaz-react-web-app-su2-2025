import { GoChecklist } from "react-icons/go";

export default function SearchIcon() {
    return (
        <span className="me-1 position-relative">
            <GoChecklist style={{ top: "10px", left: "16px" }}
                className="text-secondary me-1
                       position-absolute fs-5" />
        </span>
    );
}