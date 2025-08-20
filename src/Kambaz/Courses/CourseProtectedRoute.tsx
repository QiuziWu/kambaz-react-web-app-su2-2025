import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as enrollmentClient from "../Enrollments/client";

export default function CourseProtectedRoute({ children }: { children: any }) {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [isLoading, setIsLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    
    // Debug logs
    console.log("CourseProtectedRoute - Current user:", currentUser?._id);
    console.log("CourseProtectedRoute - Course ID:", cid);
    
    useEffect(() => {
        const checkEnrollment = async () => {
            if (!currentUser || !cid) {
                setIsLoading(false);
                return;
            }
            
            try {
                console.log("CourseProtectedRoute - Checking enrollment for user:", currentUser._id, "in course:", cid);
                const enrolled = await enrollmentClient.isUserEnrolledInCourse(currentUser._id, cid);
                setIsEnrolled(enrolled);
                console.log("CourseProtectedRoute - Enrollment check result:", enrolled);
            } catch (error) {
                console.error("CourseProtectedRoute - Error checking enrollment:", error);
                setIsEnrolled(false);
            } finally {
                setIsLoading(false);
            }
        };
        
        checkEnrollment();
    }, [currentUser, cid]);
    
    if (!currentUser) {
        console.log("CourseProtectedRoute - No current user, redirecting to signin");
        return <Navigate to="/Kambaz/Account/Signin" />;
    }
    
    if (isLoading) {
        console.log("CourseProtectedRoute - Loading enrollment status...");
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    
    console.log("CourseProtectedRoute - Is enrolled:", isEnrolled);
    
    if (!isEnrolled) {
        console.log("CourseProtectedRoute - Not enrolled, redirecting to dashboard");
        return <Navigate to="/Kambaz/Dashboard" />;
    }
    
    console.log("CourseProtectedRoute - Access granted");
    return children;
} 