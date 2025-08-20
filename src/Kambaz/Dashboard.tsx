import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setEnrollments } from "./Enrollments/reducer";
import * as enrollmentClient from "./Enrollments/client";

// DashboardProps interface removed as it's not being used

export default function Dashboard({ courses, course, setCourse, addNewCourse, updateCourse, deleteCourse, enrolling, setEnrolling, updateEnrollment }: { courses: any[]; course: any; setCourse: (course: any) => void; addNewCourse: (course: any) => Promise<void>; deleteCourse: (courseId: string) => Promise<void>; updateCourse: (courseId: string, courseUpdates: any) => Promise<void>; enrolling: boolean; setEnrolling: (enrolling: boolean) => void; updateEnrollment: (courseId: string, enrolled: boolean) => void; }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // enrollments variable removed as it's not being used

    const fetchEnrollments = async () => {
        if (!currentUser) return;
        try {
            const enrollments = await enrollmentClient.findEnrollmentsForUser(currentUser._id);
            dispatch(setEnrollments(enrollments));
        } catch (error) {
            console.error("Error fetching enrollments:", error);
        }
    };

    // handleToggleEnrollment function removed as it's not being used

    // isEnrolledInCourse function removed as it's not being used

    const handleAddCourse = async () => {
        try {
            await addNewCourse(course);
            // Reset form after successful addition
            setCourse({
                _id: "0", name: "New Course", number: "New Number",
                startDate: "2023-09-10", endDate: "2023-12-15",
                image: "/images/reactjs.jpg", description: "New Description"
            });
        } catch (error) {
            console.error("Failed to add course:", error);
        }
    };

    const handleUpdateCourse = async () => {
        try {
            if (course._id !== "0") {
                await updateCourse(course._id, course);
                // Reset form after successful update
                setCourse({
                    _id: "0", name: "New Course", number: "New Number",
                    startDate: "2023-09-10", endDate: "2023-12-15",
                    image: "/images/reactjs.jpg", description: "New Description"
                });
            }
        } catch (error) {
            console.error("Failed to update course:", error);
        }
    };

    const handleDeleteCourse = async (courseId: string) => {
        try {
            await deleteCourse(courseId);
        } catch (error) {
            console.error("Failed to delete course:", error);
        }
    };

    useEffect(() => {
        if (!currentUser) {
            navigate("/Kambaz/Account/Signin");
            return;
        }
        fetchEnrollments();
    }, [currentUser, navigate]);

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title" className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />Dashboard
                <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
                    {enrolling ? "My Courses" : "All Courses"}
                </button>
            </h1>
            <hr />
            {currentUser?.role === "FACULTY" && (
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={handleAddCourse} >
                            Add
                        </button>
                        <button className="btn btn-warning float-end me-2" id="wd-update-course-click" onClick={handleUpdateCourse} >
                            Update
                        </button>
                    </h5><br />
                    <input
                        type="text"
                        value={course.name}
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                        placeholder="Course Name"
                        className="form-control mb-2" />
                    <textarea
                        value={course.description}
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                        placeholder="Course Description"
                        className="form-control mb-2"
                        rows={3} />
                    <hr />
                </>
            )}
            <h2 id="wd-dashboard-published">
                {enrolling ? "All Courses" : "My Enrolled Courses"} ({courses.length})
            </h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((course: any) => (
                        <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <Card.Body className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        {course.name}
                                    </h5>
                                    <Card.Text
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        {course.description}
                                    </Card.Text>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <>
                                            <Link to={`/Kambaz/Courses/${course._id}/Home`}>
                                                <Button variant="primary">Go</Button>
                                            </Link>
                                            {enrolling && (
                                                <button 
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        updateEnrollment(course._id, !course.enrolled);
                                                    }}
                                                    className={`btn ${course.enrolled ? "btn-danger" : "btn-success"}`}
                                                >
                                                    {course.enrolled ? "Unenroll" : "Enroll"}
                                                </button>
                                            )}
                                            {!enrolling && (
                                                <button
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        updateEnrollment(course._id, false);
                                                    }}
                                                    className="btn btn-danger"
                                                >
                                                    Unenroll
                                                </button>
                                            )}
                                        </>

                                        {currentUser?.role === "FACULTY" && enrolling && (
                                            <button onClick={() => handleDeleteCourse(course._id)}
                                                className="btn btn-danger"
                                                id="wd-delete-course-click">
                                                Delete
                                            </button>
                                        )}
                                        {currentUser?.role === "FACULTY" && (
                                            <button id="wd-edit-course-click"
                                                onClick={() => setCourse(course)}
                                                className="btn btn-warning me-2">
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}
