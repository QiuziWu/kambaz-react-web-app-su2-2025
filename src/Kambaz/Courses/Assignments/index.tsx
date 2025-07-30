import { ListGroup, Modal, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AssignmentButtons from "./AssignmentButtons";
import AssignmentControl from "./AssignmentControl";
import AssignmentGroupButtons from "./AssignmentGroupButtons";
import { deleteAssignment } from "./reducer";
import { useState } from "react";

export default function Assignments() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const courseAssignments = assignments.filter((a: any) => a.course === cid);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const isFaculty = currentUser?.role === "FACULTY";

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

    const handleDeleteClick = (assignment: any) => {
        setAssignmentToDelete(assignment);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (assignmentToDelete) {
            dispatch(deleteAssignment(assignmentToDelete._id));
        }
        setShowDeleteModal(false);
        setAssignmentToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setAssignmentToDelete(null);
    };

    return (
        <div id="wd-assignments">
            <AssignmentControl />
            <ListGroup className="rounded-0 mt-5">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <b>ASSIGNMENTS</b>
                        <AssignmentGroupButtons />
                    </div>
                    <ListGroup className="wd-assignments rounded-0">
                        {courseAssignments.map((a: any) => (
                            <ListGroup.Item
                                key={a._id}
                                className="wd-assignments p-3 ps-1"
                            >
                                <div className="d-flex align-items-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <MdOutlineAssignment className="me-3 fs-3 text-success" />
                                    <div>
                                        {isFaculty ? (
                                            <Link to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`} className="wd-assignment-link">
                                                {a.title}
                                            </Link>
                                        ) : (
                                            <div className="wd-assignment-link text-dark" style={{ cursor: "default" }}>
                                                {a.title}
                                            </div>
                                        )}

                                        <div style={{ fontSize: "0.825rem" }}>
                                            <span className="text-danger">Multiple Modules</span> |{" "}
                                            <b> Not available until </b>{a.available}  |  <br />
                                            <b>Due</b> {a.due} | {a.points} pts
                                        </div>
                                    </div>

                                    <div className="ms-auto d-flex align-items-center">
                                        {isFaculty && (
                                            <FaTrash
                                                className="text-danger me-2"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => handleDeleteClick(a)}
                                            />
                                        )}
                                        <AssignmentButtons />
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>

            <Modal show={showDeleteModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the assignment "{assignmentToDelete?.title}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}