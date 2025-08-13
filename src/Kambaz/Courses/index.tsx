import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./Assignments/reducer";
import * as assignmentClient from "./Assignments/client";
import * as courseClient from "./client";
import { useNavigate } from "react-router-dom";

function AssignmentEditorWrapper() {
    const { cid, aid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [assignmentData, setAssignmentData] = useState<any>(null);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";

    // 如果不是faculty用户，重定向到assignments页面
    if (!isFaculty) {
        return <Navigate to={`/Kambaz/Courses/${cid}/Assignments`} replace />;
    }

    const addNewAssignment = async () => {
        try {
            const newAssignment = await assignmentClient.createAssignment(assignmentData);
            dispatch(addAssignment(newAssignment));
            navigate(`/Kambaz/Courses/${cid}/Assignments`);
        } catch (error) {
            console.error("Error creating assignment:", error);
        }
    };

    const updateAssignmentHandler = async () => {
        try {
            const updatedAssignment = await assignmentClient.updateAssignment(aid!, assignmentData);
            dispatch(updateAssignment(updatedAssignment));
            navigate(`/Kambaz/Courses/${cid}/Assignments`);
        } catch (error) {
            console.error("Error updating assignment:", error);
        }
    };

    return (
        <AssignmentEditor
            assignmentData={assignmentData}
            setAssignmentData={setAssignmentData}
            addNewAssignment={addNewAssignment}
            updateAssignment={updateAssignmentHandler}
        />
    );
}

function PeopleTableWrapper() {
    const { cid } = useParams();
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        if (!cid) return;
        try {
            const courseUsers = await courseClient.findUsersForCourse(cid);
            setUsers(courseUsers);
        } catch (error) {
            console.error("Error fetching users for course:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [cid]);

    return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}

export default function Courses() {
    const { cid } = useParams();
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const course = courses.find((c: any) => c._id === cid);
    const { pathname } = useLocation();

    if (!course) {
        return <h1>Course not found</h1>
    }
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2> <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditorWrapper />} />
                        <Route path="People" element={<PeopleTableWrapper />} />
                    </Routes>
                </div>
            </div>
        </div>

    );
}