import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./style.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import CourseProtectedRoute from "./Courses/CourseProtectedRoute";
import * as userClient from "./Account/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCourses } from "./Courses/reducer";
import * as courseClient from "./Courses/client";

export default function Kambaz() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { courses } = useSelector((state: any) => state.coursesReducer);

    
    const fetchCourses = async () => {
        try {
            const courses = await userClient.findMyCourses();
            dispatch(setCourses(courses));
        } catch (error: any) {
            console.error("Error fetching courses:", error);
        }
    };

    const addCourse = async (course: any) => {
        try {
            const newCourse = await userClient.createCourse(course);
            dispatch(setCourses([...courses, newCourse]));
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
        if (currentUser) {
            fetchCourses();
        }
    }, [currentUser, dispatch]);

    return (
        <div id="wd-kambaz">
            <KambazNavigation />
            <div className="wd-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="Account" />} />
                    <Route path="/Account/*" element={<Account />} />
                    <Route path="/Dashboard" element={<ProtectedRoute><Dashboard addCourse={addCourse} updateCourse={updateCourse} deleteCourse={deleteCourse} /></ProtectedRoute>} />
                    <Route path="/Courses/:cid/*" element={<CourseProtectedRoute><Courses /></CourseProtectedRoute>} />
                    <Route path="/Calendar" element={<h1>Calendar</h1>} />
                    <Route path="/Inbox" element={<h1>Inbox</h1>} />
                </Routes>
            </div>
        </div>
    );
}



