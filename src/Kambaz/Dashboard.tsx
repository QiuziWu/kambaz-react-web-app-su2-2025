import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setEnrollments } from "./Enrollments/reducer";
import * as enrollmentClient from "./Enrollments/client";

interface DashboardProps {
    addCourse: (course: any) => Promise<void>;
    updateCourse: (courseId: string, courseUpdates: any) => Promise<void>;
    deleteCourse: (courseId: string) => Promise<void>;
}

export default function Dashboard({ addCourse, updateCourse, deleteCourse }: DashboardProps) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });

    const fetchEnrollments = async () => {
        if (!currentUser) return;
        try {
            const enrollments = await enrollmentClient.findEnrollmentsForUser(currentUser._id);
            dispatch(setEnrollments(enrollments));
        } catch (error) {
            console.error("Error fetching enrollments:", error);
        }
    };

    const handleToggleEnrollment = async (courseId: string) => {
        if (!currentUser) return;
        
        try {
            const isEnrolled = enrollments.some((e: any) => 
                e.user === currentUser._id && e.course === courseId
            );
            
            if (isEnrolled) {
                // Unenroll
                await enrollmentClient.unenrollUserFromCourse(currentUser._id, courseId);
            } else {
                // Enroll
                await enrollmentClient.enrollUserInCourse(currentUser._id, courseId);
            }
            
            // Refresh enrollments
            await fetchEnrollments();
        } catch (error) {
            console.error("Error toggling enrollment:", error);
        }
    };

    const isEnrolledInCourse = (courseId: string) => {
        return enrollments.some((e: any) => 
            e.user === currentUser._id && e.course === courseId
        );
    };

    const handleAddCourse = async () => {
        try {
            await addCourse(course);
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
        if (currentUser) {
            fetchEnrollments();
        }
    }, [currentUser]);

    return (
        <div id="wd-dashboard">
            <div className="d-flex justify-content-between align-items-center">
                <h1 id="wd-dashboard-title" className="text-danger">
                    <FaAlignJustify className="me-4 fs-4 mb-1" />Dashboard
                </h1>
            </div>
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
                My Enrolled Courses ({courses.length})
            </h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((course: any) => (
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
                                        <>
                                            <Link to={`/Kambaz/Courses/${course._id}/Home`}>
                                                <Button variant="primary">Go</Button>
                                            </Link>
                                            <Button
                                                variant={isEnrolledInCourse(course._id) ? "danger" : "success"}
                                                onClick={() => handleToggleEnrollment(course._id)}
                                            >
                                                {isEnrolledInCourse(course._id) ? "Unenroll" : "Enroll"}
                                            </Button>
                                        </>

                                        {currentUser?.role === "FACULTY" && (
                                            <>
                                                <button onClick={() => handleDeleteCourse(course._id)}
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
