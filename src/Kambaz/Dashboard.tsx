import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addCourse, deleteCourse, updateCourse, setCurrentCourse } from "./Courses/reducer";
import { toggleEnrollment } from "./Enrollments/reducer";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

    const [showAllCourses, setShowAllCourses] = useState(false);
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });

    const isEnrolledInCourse = (courseId: string) => {
        return enrollments.some(
            (enrollment: any) =>
                enrollment.user === currentUser._id &&
                enrollment.course === courseId
        );
    };

    const filteredCourses = showAllCourses
        ? courses
        : courses.filter((course: any) => isEnrolledInCourse(course._id));

    return (
        <div id="wd-dashboard">
            <div className="d-flex justify-content-between align-items-center">
                <h1 id="wd-dashboard-title" className="text-danger">
                    <FaAlignJustify className="me-4 fs-4 mb-1" />Dashboard
                </h1>
                <Button
                    variant="primary"
                    onClick={() => setShowAllCourses(!showAllCourses)}
                >
                    {showAllCourses ? "My Enrollments" : "All Courses"}
                </Button>
            </div>
            <hr />
            {currentUser?.role === "FACULTY" && (
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={() => dispatch(addCourse(course as any))} >
                            Add
                        </button>
                        <button className="btn btn-warning float-end me-2" id="wd-update-course-click" onClick={() => dispatch(updateCourse(course as any))} >
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
                {showAllCourses ? "All Courses" : "My Enrolled Courses"} ({filteredCourses.length})
            </h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {filteredCourses.map((course: any) => (
                        <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <Card.Body className="card-body">
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        {course.name}
                                    </Card.Title>
                                    <Card.Text
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        {course.description}
                                    </Card.Text>

                                    <div className="d-flex justify-content-between align-items-center">
                                        {isEnrolledInCourse(course._id) ? (
                                            <>
                                                <Link to={`/Kambaz/Courses/${course._id}/Home`}>
                                                    <Button variant="primary">Go</Button>
                                                </Link>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => dispatch(toggleEnrollment({
                                                        userId: currentUser._id,
                                                        courseId: course._id
                                                    }))}
                                                >
                                                    Unenroll
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                variant="success"
                                                onClick={() => dispatch(toggleEnrollment({
                                                    userId: currentUser._id,
                                                    courseId: course._id
                                                }))}
                                            >
                                                Enroll
                                            </Button>
                                        )}

                                        {currentUser?.role === "FACULTY" && (
                                            <>
                                                <button onClick={() => dispatch(deleteCourse(course._id))}
                                                    className="btn btn-danger"
                                                    id="wd-delete-course-click">
                                                    Delete
                                                </button>
                                                <button id="wd-edit-course-click"
                                                    onClick={() => setCourse(course)}
                                                    className="btn btn-warning me-2">
                                                    Edit
                                                </button>
                                            </>
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

