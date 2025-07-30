import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function CourseProtectedRoute({ children }: { children: any }) {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    
    if (!currentUser) {
        return <Navigate to="/Kambaz/Account/Signin" />;
    }
    
    // Check if user is enrolled in the course
    const isEnrolled = enrollments.some(
        (enrollment: any) => 
            enrollment.user === currentUser._id && 
            enrollment.course === cid
    );
    
    if (!isEnrolled) {
        return <Navigate to="/Kambaz/Dashboard" />;
    }
    
    return children;
} 