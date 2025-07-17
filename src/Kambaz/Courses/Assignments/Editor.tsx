import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <Form>
                <Form.Group className="ms-1 mb-2">
                    <Form.Label className="mb-2">Assignment Name</Form.Label>
                    <Form.Control id="wd-name" value="A1" />
                </Form.Group>
                <div className="ms-1 mb-3 border rounded p-3">
                    <p>The assignment is <span className="text-danger">available online</span>.<br /><br />
                        Submit a link to the landing page of your Web application running on Netlify.<br /><br />
                        The landing page should include the following:</p>
                    <ul>
                        <li>Your full name and section</li>
                        <li>Links to each of the lab assignments</li>
                        <li>Link to the Kanbas application</li>
                        <li>Links to all relevant source code repositories</li>
                    </ul>
                    <p>The Kanbas application should include a link to navigate back to the landing page.</p>
                </div>
            </Form>
            <Container>
                <Row className="mb-2">
                    <Col className="text-end" xs={3}>Points</Col>
                    <Col>
                        <Form.Control id="wd-points" value={100} />
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
                            <Form.Check className="ms-2 mb-2" type="checkbox" name="wd-online-entry-checkbox" id="wd-online-entry" label="Text Entry" />
                            <Form.Check className="ms-2 mb-2" type="checkbox" name="wd-online-entry-checkbox" id="wd-online-entry" label="Website URL" />
                            <Form.Check className="ms-2 mb-2" type="checkbox" name="wd-online-entry-checkbox" id="wd-online-entry" label="Media Recordings" />
                            <Form.Check className="ms-2 mb-2" type="checkbox" name="wd-online-entry-checkbox" id="wd-online-entry" label="Student Annotation" />
                            <Form.Check className="ms-2 mb-2" type="checkbox" name="wd-online-entry-checkbox" id="wd-online-entry" label="File Uploads" />
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
                                <Form.Control type="date" id="wd-assignment-due" defaultValue="2025-07-15" />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Label className="mb-2"><b>Available from</b></Form.Label>
                                        <Form.Control type="date" id="wd-assignment-due" defaultValue="2025-07-09" />
                                    </Col>
                                    <Col>
                                        <Form.Label className="mb-2"><b>Until</b></Form.Label>
                                        <Form.Control type="date" id="wd-assignment-due" defaultValue="2025-07-15" />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
            </Container>
            <hr />
            <div className="float-end">
                <Button variant="secondary">Cancel</Button>
                <Button variant="danger" className="ms-2">Save</Button>
            </div>
        </div>
    );
}