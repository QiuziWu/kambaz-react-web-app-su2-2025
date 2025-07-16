import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <div className="container mt-4" id="wd-assignments-editor">
            <Form>
                <Form.Group className="mb-3" controlId="wd-name">
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control type="text" value="A1 - ENV + HTML" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-description">
                    <Form.Control as="textarea" rows={8} defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-points">
                    <Form.Label>Points</Form.Label>
                    <Form.Control type="test" value={100} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-group">
                    <Form.Label>Assignment Group</Form.Label>
                    <Form.Select defaultValue="ASSIGNMENTS">
                        <option>ASSIGNMENTS</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-display-grade-as">
                    <Form.Label>Display Grade as</Form.Label>
                    <Form.Select defaultValue="Percentage">
                        <option>Percentage</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-submission-type">
                    <Form.Label>Submission Type</Form.Label>
                    <Form.Select>
                        <option>Online</option>
                    </Form.Select>
                    <div className="mt-3 ms-1">
                        <div><Form.Check type="checkbox" label="Text Entry" /></div>
                        <div><Form.Check type="checkbox" label="Website URL" defaultChecked /></div>
                        <div><Form.Check type="checkbox" label="Media Recordings" /></div>
                        <div><Form.Check type="checkbox" label="Student Annotation" /></div>
                        <div><Form.Check type="checkbox" label="File Uploads" /></div>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-assign-to">
                    <Form.Label>Assign to</Form.Label>
                    <Form.Control type="text" value="Everyone" />
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Due</Form.Label>
                        <Form.Control type="date" defaultValue="2024-05-13" />
                    </Col>
                    <Col>
                        <Form.Label>Available from</Form.Label>
                        <Form.Control type="date" defaultValue="2024-05-06" />
                    </Col>
                    <Col>
                        <Form.Label>Until</Form.Label>
                        <Form.Control type="date" defaultValue="2024-05-20" />
                    </Col>
                </Row>

                <hr />
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2">Cancel</Button>
                    <Button variant="danger">Save</Button>
                </div>
            </Form>
        </div>
    );
}
