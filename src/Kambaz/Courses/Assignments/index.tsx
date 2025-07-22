import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import * as db from "../../Database";
import AssignmentButtons from "./AssignmentButtons";
import AssignmentControl from "./AssignmentControl";
import AssignmentGroupButtons from "./AssignmentGroupButtons";

export default function Assignments() {
    const { cid } = useParams();
    const courseAssignments = db.assignments.filter((a) => a.course === cid);
    return (
        <div id="wd-assignments">
            <AssignmentControl />
            <ListGroup className="rounded-0 mt-5">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        ASSIGNMENTS 40% of Total
                        <AssignmentGroupButtons />
                    </div>
                    <ListGroup className="wd-assignments rounded-0">
                        {courseAssignments.map((a) => (
                            <ListGroup.Item
                                key={a._id}
                                className="wd-assignments p-3 ps-1"
                            >
                                <div className="d-flex align-items-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <MdOutlineAssignment className="me-3 fs-3 text-success" />
                                    <div>
                                        <Link to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`}
                                            className="wd-assignment-link"
                                        >
                                            {a.title}
                                        </Link>
                                        <br />
                                        <div style={{ fontSize: "0.825rem" }}>
                                            <span className="text-danger">Multiple Modules</span> |{" "}
                                            <b> Not available until </b>{a.available}  |  <br />
                                            <b>Due</b> {a.due} | {a.points} pts
                                        </div>
                                    </div>
                                    <div className="ms-auto">
                                        <AssignmentButtons />
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div >
    );
}