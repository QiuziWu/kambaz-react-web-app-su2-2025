import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import AssignmentButtons from "./AssignmentButtons";
import AssignmentControl from "./AssignmentControl";
import AssignmentGroupButtons from "./AssignmentGroupButtons";

export default function Assignments() {
    return (
        <div id="wd-assignments">
            <AssignmentControl />
            <ListGroup className="rounded-0 mt-5">
                <ListGroup.Item className="wd-module
                    p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        ASSIGNMENTS 40% of Total
                        <AssignmentGroupButtons />
                    </div>

                    <ListGroup className="wd-assignments rounded-0">
                        <ListGroup.Item className="wd-assignments p-3 ps-1">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="me-2 fs-3" />
                                <MdOutlineAssignment className="me-3 fs-3 text-success" />
                                <div>
                                    <a href="#/Kambaz/Courses/1234/Assignments/123"
                                        className="wd-assignment-link" >
                                        A1
                                    </a> <br />
                                    <div style={{ fontSize: "0.825rem" }}>
                                        <span className="text-danger">Multiple Modules</span>  |  <b> Not available until </b>May 6 at 12:00am  |  <br />
                                        <b>Due</b> May 13 at 11:50pm | 100 pts
                                    </div>
                                </div>
                                <div className="ms-auto">
                                    <AssignmentButtons />
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-assignments p-3 ps-1">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="me-2 fs-3" />
                                <MdOutlineAssignment className="me-3 fs-3 text-success" />
                                <div>
                                    <a href="#/Kambaz/Courses/1234/Assignments/123"
                                        className="wd-assignment-link" >
                                        A2
                                    </a> <br />
                                    <div style={{ fontSize: "0.825rem" }}>
                                        <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am | <br />
                                        <b>Due</b> May 20 at 11:50pm | 100 pts
                                    </div>
                                </div>
                                <div className="ms-auto">
                                    <AssignmentButtons />
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-assignments p-3 ps-1">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="me-2 fs-3" />
                                <MdOutlineAssignment className="me-3 fs-3 text-success" />
                                <div>
                                    <a href="#/Kambaz/Courses/1234/Assignments/123"
                                        className="wd-assignment-link" >
                                        A3
                                    </a> <br />
                                    <div style={{ fontSize: "0.825rem" }}>
                                        <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am | <br />
                                        <b>Due</b> May 27 at 11:50pm | 100 pts
                                    </div>
                                </div>
                                <div className="ms-auto">
                                    <AssignmentButtons />
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div >
    );
}