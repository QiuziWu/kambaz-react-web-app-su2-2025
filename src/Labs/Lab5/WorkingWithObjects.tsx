import { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";

const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: 2,
        name: "Web Development",
        description: "Learn modern web development",
        course: "CS5610"
    });
    const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
    const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>

            {/* Assignment Section */}
            <h4>Assignment Operations</h4>

            <div className="mb-3">
                <h5>Retrieving Assignment</h5>
                <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
                    href={`${ASSIGNMENT_API_URL}`}>
                    Get Assignment
                </a>
                <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                    href={`${ASSIGNMENT_API_URL}/title`}>
                    Get Title
                </a>
            </div>

            <div className="mb-3">
                <h5>Modifying Assignment</h5>
                <div className="mb-2">
                    <label htmlFor="wd-assignment-title" className="form-label">Title</label>
                    <div className="d-flex">
                        <FormControl className="w-75 me-2" id="wd-assignment-title"
                            value={assignment.title} onChange={(e) =>
                                setAssignment({ ...assignment, title: e.target.value })} />
                        <a id="wd-update-assignment-title" className="btn btn-primary"
                            href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                            Update Title
                        </a>
                    </div>
                </div>

                <div className="mb-2">
                    <label htmlFor="wd-assignment-score" className="form-label">Score</label>
                    <div className="d-flex">
                        <FormControl type="number" className="w-75 me-2" id="wd-assignment-score"
                            value={assignment.score} onChange={(e) =>
                                setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })} />
                        <a id="wd-update-assignment-score" className="btn btn-primary"
                            href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                            Update Score
                        </a>
                    </div>
                </div>

                <div className="mb-2">
                    <label htmlFor="wd-assignment-completed" className="form-label me-2">Completed</label>
                    <div className="d-flex align-items-center">
                        <FormCheck className="me-2"
                            id="wd-assignment-completed"
                            checked={assignment.completed}
                            onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
                        />
                        <a id="wd-update-assignment-completed" className="btn btn-primary"
                            href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                            Update Status
                        </a>
                    </div>
                </div>
            </div>
            <hr />

            {/* Module Section */}
            <h4>Module Operations</h4>

            <div className="mb-3">
                <h5>Retrieving Module</h5>
                <a id="wd-retrieve-module" className="btn btn-primary me-2"
                    href={`${MODULE_API_URL}`}>
                    Get Module
                </a>
                <a id="wd-retrieve-module-name" className="btn btn-primary"
                    href={`${MODULE_API_URL}/name`}>
                    Get Module Name
                </a>
            </div>

            <div className="mb-3">
                <h5>Modifying Module</h5>
                <div className="mb-2">
                    <label htmlFor="wd-module-name" className="form-label">Name</label>
                    <div className="d-flex">
                        <FormControl className="w-75 me-2" id="wd-module-name"
                            value={module.name} onChange={(e) =>
                                setModule({ ...module, name: e.target.value })} />
                        <a id="wd-update-module-name" className="btn btn-primary"
                            href={`${MODULE_API_URL}/name/${module.name}`}>
                            Update Name
                        </a>
                    </div>
                </div>

                <div className="mb-2">
                    <label htmlFor="wd-module-description" className="form-label">Description</label>
                    <div className="d-flex">
                        <FormControl as="textarea" className="w-75 me-2" id="wd-module-description"
                            value={module.description} onChange={(e) =>
                                setModule({ ...module, description: e.target.value })} />
                        <a id="wd-update-module-description" className="btn btn-primary"
                            href={`${MODULE_API_URL}/description/${module.description}`}>
                            Update Description
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

