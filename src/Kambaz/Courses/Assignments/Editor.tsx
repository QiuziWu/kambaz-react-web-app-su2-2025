import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";
import { useSelector } from "react-redux";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignment = db.assignments.find(a => a._id === aid && a.course === cid);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    if (currentUser?.role !== "FACULTY") return <h4>You are not authorized to edit this assignment.</h4>;
    if (!assignment) return <h3>Assignment not found</h3>;
    return (
        <div id="wd-assignments-editor">
            <Form>
                <Form.Group className="ms-1 mb-2">
                    <Form.Label className="mb-2">Assignment Name</Form.Label>
                    <Form.Control id="wd-name" value={assignment.title} />
                </Form.Group>
                <div className="ms-1 mb-3 border rounded p-3">
                    <p>{assignment.description}</p>
                </div>
            </Form>
            <Container>
                <Row className="mb-2">
                    <Col className="text-end" xs={3}>Points</Col>
                    <Col>
                        <Form.Control id="wd-points" value={assignment.points} />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col className="text-end" xs={3}>Assignment Group</Col>
                    <Col>
                        <Form.Select id="wd-assignment-group" defaultValue="ASSIGNMENTS">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col className="text-end" xs={3}>Display Grade As</Col>
                    <Col>
                        <Form.Select id="wd-grade-display" defaultValue="PERCENT">
                            <option value="PERCENT">Percentage</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col className="text-end" xs={3}>Submission Type</Col>
                    <Col>
                        <div className="border border-gray rounded-2 p-3">
                            <Form.Select id="wd-submission-type" className="mb-2">
                                <option value="ONLINE">Online</option>
                            </Form.Select>
                            {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map((label, idx) => (
                                <Form.Check
                                    key={idx}
                                    className="ms-2 mb-2"
                                    type="checkbox"
                                    name="wd-online-entry-checkbox"
                                    label={label}
                                />
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col className="text-end" xs={3}>Assign</Col>
                    <Col>
                        <div className="border border-gray rounded-2 p-3">
                            <Form.Group className="mb-4">
                                <Form.Label className="mb-2"><b>Assign to</b></Form.Label>
                                <Form.Select id="wd-assign-to" >
                                    <option value="EVERY">Everyone</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="mb-2"><b>Due</b></Form.Label>
                                <Form.Control type="date" id="wd-assignment-due" defaultValue={assignment.duedate} />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Label className="mb-2"><b>Available from</b></Form.Label>
                                        <Form.Control type="date" id="wd-assignment-due" defaultValue={assignment.availabledate} />
                                    </Col>
                                    <Col>
                                        <Form.Label className="mb-2"><b>Until</b></Form.Label>
                                        <Form.Control type="date" id="wd-assignment-due" defaultValue={assignment.duedate} />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
            </Container>
            <hr />
            <div className="float-end">
                <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                    <Button variant="secondary">Cancel</Button>
                </Link>
                <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                    <Button variant="danger" className="ms-2">Save</Button>
                </Link>
            </div>
        </div>
    );
}