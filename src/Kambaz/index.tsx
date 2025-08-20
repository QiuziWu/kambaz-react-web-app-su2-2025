import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./style.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import CourseProtectedRoute from "./Courses/CourseProtectedRoute";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCourses } from "./Courses/reducer";
import { setEnrollments } from "./Enrollments/reducer";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import * as enrollmentClient from "./Enrollments/client";

export default function Kambaz() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const [enrolling, setEnrolling] = useState<boolean>(false);
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });
    const findCoursesForUser = async () => {
        if (!currentUser) return;
        try {
            const courses = await userClient.findCoursesForUser(currentUser._id);
            dispatch(setCourses(courses));
        } catch (error) {
            console.error(error);
        }
    };

    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        if (!currentUser) return;
        try {
            if (enrolled) {
                await userClient.enrollIntoCourse(currentUser._id, courseId);
            } else {
                await userClient.unenrollFromCourse(currentUser._id, courseId);
            }
            // Update the courses state to reflect the enrollment change
            const updatedCourses = courses.map((course: any) => {
                if (course._id === courseId) {
                    return { ...course, enrolled: enrolled };
                } else {
                    return course;
                }
            });
            dispatch(setCourses(updatedCourses));
        } catch (error) {
            console.error("Error updating enrollment:", error);
        }
    };

    const fetchEnrollments = async () => {
        if (!currentUser) return;
        try {
            const enrollments = await enrollmentClient.findEnrollmentsForUser(currentUser._id);
            dispatch(setEnrollments(enrollments));
        } catch (error) {
            console.error("Error fetching enrollments:", error);
        }
    };

    const fetchCourses = async () => {
        if (!currentUser) return;
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(
                currentUser._id
            );
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses.find((c: any) => c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });
            dispatch(setCourses(courses));
        } catch (error) {
            console.error(error);
        }
    };


    const addCourse = async (course: any) => {
        console.log("addCourse function called with:", course);
        try {
            const result = await courseClient.createCourse(course);
            console.log("Course created successfully:", result);
            // After creating a course, refresh the courses list to ensure consistency
            if (enrolling) {
                await fetchCourses();
            } else {
                await findCoursesForUser();
            }
        } catch (error: any) {
            console.error("Error creating course:", error);
        }
    };

    const updateCourse = async (courseId: string, courseUpdates: any) => {
        try {
            const updatedCourse = await userClient.updateCourse(courseId, courseUpdates);
            // Replace the old course with the updated version in local state
            const updatedCourses = courses.map((course: any) =>
                course._id === courseId ? updatedCourse : course
            );
            dispatch(setCourses(updatedCourses));
        } catch (error: any) {
            console.error("Error updating course:", error);
        }
    };

    const deleteCourse = async (courseId: string) => {
        try {
            await userClient.deleteCourse(courseId);
            // Filter out the deleted course from local state
            const updatedCourses = courses.filter((course: any) => course._id !== courseId);
            dispatch(setCourses(updatedCourses));
        } catch (error: any) {
            console.error("Error deleting course:", error);
        }
    };

    useEffect(() => {
        if (!currentUser) return;
        
        // Always fetch enrollments when user is logged in
        fetchEnrollments();
        
        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrolling]);

    // Separate useEffect for enrollments to ensure it loads immediately when user is available
    useEffect(() => {
        if (currentUser) {
            console.log("Kambaz - Fetching enrollments for user:", currentUser._id);
            fetchEnrollments();
        }
    }, [currentUser]);

    return (
        <div id="wd-kambaz">
            <KambazNavigation />
            <div className="wd-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="Account" />} />
                    <Route path="/Account/*" element={<Account />} />
                    <Route path="/Dashboard" element={<ProtectedRoute><Dashboard courses={courses} course={course} setCourse={setCourse} addNewCourse={addCourse} deleteCourse={deleteCourse} updateCourse={updateCourse} enrolling={enrolling} setEnrolling={setEnrolling} updateEnrollment={updateEnrollment} /></ProtectedRoute>} />
                    <Route path="/Courses/:cid/*" element={<CourseProtectedRoute><Courses /></CourseProtectedRoute>} />
                    <Route path="/Calendar" element={<h1>Calendar</h1>} />
                    <Route path="/Inbox" element={<h1>Inbox</h1>} />
                </Routes>
            </div>
        </div>
    );
}



