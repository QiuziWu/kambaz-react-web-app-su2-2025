import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AssignmentEditor({ assignmentData, setAssignmentData, addNewAssignment, updateAssignment }: { assignmentData: any, setAssignmentData: (data: any) => void, addNewAssignment: () => void, updateAssignment: () => void }) {
    const { cid, aid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const isNew = aid === "new";
    const saveChange = () => {
        if (isNew) {
            addNewAssignment();
        }
        else {
            updateAssignment();
        }
    }
    useEffect(() => {
        let assignment;
        if (isNew) {
            assignment = {
                title: "New Assignment",
                description: "",
                course: cid,
                available_from_date: "",
                available_from_time: "12:00",
                available_until_date: "",
                available_until_time: "23:59",
                dueDate: "",
                dueTime: "23:59",
                points: 0
            }
        }
        else {
            assignment = assignments.find((assignment: any) => assignment._id === aid)
        }
        setAssignmentData(assignment);
    }, [isNew, aid, cid, assignments])
    return (
        <div id="wd-assignments-editor">
            <Form>
                <Form.Group className="ms-1 mb-2">
                    <Form.Label className="mb-2">Assignment Name</Form.Label>
                    <Form.Control id="wd-assignment-editor-name" value={assignmentData?.title || ""} onChange={(e) => setAssignmentData({ ...assignmentData, title: e.target.value })} />
                </Form.Group>
                <Form.Control id="wd-assignment-editor-describe" as="textarea" rows={10} className="ms-1 mb-2" value={assignmentData?.description || ""} onChange={(e) => setAssignmentData({ ...assignmentData, description: e.target.value })} />
            </Form>
            <Container>
                <Row className="mb-2">
                    <Col className="text-end" xs={3}>Points</Col>
                    <Col>
                        <Form.Control id="wd-assignment-editor-points" value={assignmentData?.points || ""} onChange={(e) => setAssignmentData({ ...assignmentData, points: e.target.value })} />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col className="text-end" xs={3}>Assignment Group</Col>
                    <Col>
                        <Form.Select id="wd-assignment-group">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col className="text-end" xs={3}>Display Grade As</Col>
                    <Col>
                        <Form.Select id="wd-grade-display">
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
                            <Form.Label className="ms-2 mb-2"><b>Online Entry Options</b></Form.Label>
                            <Form.Check className="ms-2 mb-2" type="checkbox" name="wd-online-entry-checkbox" id="wd-online-text-entry" label="Text Entry" />
                            <Form.Check className="ms-2 mb-2" type="checkbox" name="wd-online-entry-checkbox" id="wd-online-url" label="Website URL" />
                            <Form.Check className="ms-2 mb-2" type="checkbox" name="wd-online-entry-checkbox" id="wd-online-media" label="Media Recordings" />
                            <Form.Check className="ms-2 mb-2" type="checkbox" name="wd-online-entry-checkbox" id="wd-online-annotation" label="Student Annotation" />
                            <Form.Check className="ms-2 mb-2" type="checkbox" name="wd-online-entry-checkbox" id="wd-online-file" label="File Uploads" />
                        </div>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col className="text-end" xs={3}>Assign</Col>
                    <Col>
                        <div className="border border-gray rounded-2 p-3">
                            <Form.Group className="mb-4">
                                <Form.Label className="mb-2"><b>Assign to</b></Form.Label>
                                <Form.Select id="wd-assign-to">
                                    <option value="EVERY">Everyone</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="mb-2"><b>Due</b></Form.Label>
                                <Form.Control type="date" id="wd-assignment-due" value={assignmentData?.dueDate || ""} onChange={(e) => setAssignmentData({ ...assignmentData, dueDate: e.target.value })} />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Label className="mb-2"><b>Available from</b></Form.Label>
                                        <Form.Control type="date" id="wd-assignment-available-from-date" value={assignmentData?.available_from_date || ""} onChange={(e) => setAssignmentData({ ...assignmentData, available_from_date: e.target.value })} />
                                    </Col>
                                    <Col>
                                        <Form.Label className="mb-2"><b>Until</b></Form.Label>
                                        <Form.Control type="date" id="wd-assignment-available-until-date" value={assignmentData?.available_until_date || ""} onChange={(e) => setAssignmentData({ ...assignmentData, available_until_date: e.target.value })} />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
            </Container>
            <hr />
            <div className="float-end">
                <Button as={Link as any} to={`/Kambaz/Courses/${cid}/Assignments`} variant="secondary">Cancel</Button>
                <Button as={Link as any} to={`/Kambaz/Courses/${cid}/Assignments`} variant="danger" className="ms-2" onClick={saveChange}>Save</Button>
            </div>
        </div>
    );
}
