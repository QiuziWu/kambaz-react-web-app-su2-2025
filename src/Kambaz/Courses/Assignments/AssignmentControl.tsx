import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchIcon from "./SearchIcon";
import { useSelector } from "react-redux";

export default function AssignmentControl() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();
    const permission = currentUser.role === "FACULTY" ? ["Group", "Add", "Edit", "View", "Delete"] : ["View"];
    return (
        <div className="d-flex">
            <SearchIcon />
            <Form.Control placeholder="Search for Assignments"
                id="wd-search-assignment" className="mb-2 ms-1 w-25" style={{ paddingLeft: '2rem' }} />
            {permission.includes("Group") && (<Button id="wd-add-assignment-group" variant="secondary" size="lg" className="me-1 ms-4">+ Group</Button>)}
            {permission.includes("Add") && (<Button id="wd-add-assignment" variant="danger" size="lg" className="me-1" onClick={() => navigate("new")}>+ Assignment</Button>)}
        </div>
    );
}