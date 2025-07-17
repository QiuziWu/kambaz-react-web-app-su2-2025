import { HiSearch } from "react-icons/hi";

export default function SearchIcon() {
    return (
        <span className="me-1 position-relative">
            <HiSearch style={{ top: "10px", left: "16px" }}
                className="text-secondary me-1
                       position-absolute fs-5" />
        </span>
    );
}