import { Button, Form } from "react-bootstrap";
import SearchIcon from "./SearchIcon";

export default function AssignmentsControl() {
    return (
        <div className="d-flex">
            <SearchIcon />
            <Form.Control placeholder="Search for Assignments"
                id="wd-search-assignment" className="mb-2 ms-1 w-25" style={{ paddingLeft: '2rem' }} />
            <Button id="wd-add-assignment-group" variant="secondary" size="lg" className="me-1 ms-4">+ Group</Button>
            <Button id="wd-add-assignment" variant="danger" size="lg" className="me-1">+ Assignment</Button>
        </div>
    );
}