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
    const location = useLocation();
    const dispatch = useDispatch();
    const [assignmentData, setAssignmentData] = useState<any>(null);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    
    console.log("AssignmentEditorWrapper - useParams result:", { cid, aid });
    console.log("AssignmentEditorWrapper - currentUser:", currentUser);
    console.log("AssignmentEditorWrapper - isFaculty:", isFaculty);
    console.log("AssignmentEditorWrapper - location.pathname:", location.pathname);

    // 如果不是faculty用户，重定向到assignments页面
    if (!isFaculty) {
        return <Navigate to={`/Kambaz/Courses/${cid}/Assignments`} replace />;
    }

    // 获取作业数据
    useEffect(() => {
        const fetchAssignmentData = async () => {
            console.log("AssignmentEditorWrapper - aid:", aid);
            console.log("AssignmentEditorWrapper - cid:", cid);
            
            // 检查当前URL路径
            const currentPath = location.pathname;
            console.log("Current path:", currentPath);
            
            // 如果路径包含 "new"，说明是创建新作业
            if (currentPath.includes("/new") || aid === "new") {
                console.log("Creating new assignment");
                setAssignmentData({
                    title: "New Assignment",
                    description: "",
                    course: cid,
                    available: "May 1 at 12:00am",
                    due: "May 8 at 11:50pm",
                    duedate: "2025-05-08",
                    availabledate: "2025-05-01",
                    points: 100
                });
                return;
            }
            
            if (!aid) {
                console.error("aid is undefined, redirecting to assignments list");
                navigate(`/Kambaz/Courses/${cid}/Assignments`);
                return;
            }
            
            // 编辑现有作业
            try {
                console.log("Fetching assignment with ID:", aid);
                // 首先尝试从Redux store中获取
                let assignment = assignments.find((a: any) => a._id === aid);
                
                // 如果store中没有，则从API获取
                if (!assignment) {
                    console.log("Assignment not found in store, fetching from API...");
                    assignment = await assignmentClient.findAssignmentById(aid);
                }
                
                if (assignment) {
                    console.log("Assignment found:", assignment);
                    setAssignmentData(assignment);
                } else {
                    console.error("Assignment not found");
                    navigate(`/Kambaz/Courses/${cid}/Assignments`);
                }
            } catch (error) {
                console.error("Error fetching assignment:", error);
                navigate(`/Kambaz/Courses/${cid}/Assignments`);
            }
        };

        fetchAssignmentData();
    }, [aid, cid, assignments, navigate]);

    const addNewAssignment = async () => {
        try {
            console.log("Creating new assignment with data:", assignmentData);
            const newAssignment = await assignmentClient.createAssignment(assignmentData);
            console.log("New assignment created:", newAssignment);
            dispatch(addAssignment(newAssignment));
            console.log("Assignment added to Redux store");
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

    // 如果数据还在加载中，显示加载状态
    if (!assignmentData && aid !== "new") {
        return <div>Loading assignment...</div>;
    }

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
                        <Route path="Assignments/new" element={<AssignmentEditorWrapper />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditorWrapper />} />
                        <Route path="People" element={<PeopleTableWrapper />} />
                    </Routes>
                </div>
            </div>
        </div>

    );
}