import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const isFaculty = currentUser?.role === "FACULTY";

    const isEditing = aid !== "new";
    const assignment = isEditing ? assignments.find((a: any) => a._id === aid && a.course === cid) : null;

    useEffect(() => {
        if (!isFaculty) {
            navigate(`/Kambaz/Courses/${cid}/Assignments`);
        }
    }, [isFaculty]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        points: 100,
        duedate: "",
        availabledate: "",
        due: "",
        available: "",
    });

    useEffect(() => {
        if (isEditing && assignment) {
            setFormData({
                title: assignment.title || "",
                description: assignment.description || "",
                points: assignment.points || 100,
                duedate: assignment.duedate || "",
                availabledate: assignment.availabledate || "",
                due: assignment.due || "",
                available: assignment.available || "",
            });
        } else {
            const today = new Date().toISOString().split("T")[0];
            const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];
            setFormData({
                title: "",
                description: "",
                points: 100,
                duedate: nextWeek,
                availabledate: today,
                due: `Due ${nextWeek}`,
                available: `Available from ${today}`,
            });
        }
    }, [isEditing, assignment]);

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        const assignmentData = {
            ...formData,
            course: cid,
            _id: isEditing ? assignment._id : Date.now().toString(),
        };
        if (isEditing) {
            dispatch(updateAssignment(assignmentData));
        } else {
            dispatch(addAssignment(assignmentData));
        }
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="p-3">
            <h4>Assignment Editor</h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Points</Form.Label>
                    <Form.Control
                        type="number"
                        value={formData.points}
                        onChange={(e) => handleInputChange("points", parseInt(e.target.value) || 0)}
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Available From</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.availabledate}
                                onChange={(e) => handleInputChange("availabledate", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Available Until</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.duedate}
                                onChange={(e) => handleInputChange("duedate", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        value={formData.due}
                        onChange={(e) => handleInputChange("due", e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Available From</Form.Label>
                    <Form.Control
                        value={formData.available}
                        onChange={(e) => handleInputChange("available", e.target.value)}
                    />
                </Form.Group>
                <div className="text-end">
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button className="ms-2" variant="danger" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
}
