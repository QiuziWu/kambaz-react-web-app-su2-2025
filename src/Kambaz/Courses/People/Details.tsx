import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import * as client from "../../Account/client";
import { FormControl, FormSelect } from "react-bootstrap";

interface PeopleDetailsProps {
  fetchUsers?: () => void;
}

export default function PeopleDetails({ fetchUsers }: PeopleDetailsProps) {
  const { uid } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    try {
      const user = await client.findUserById(uid);
      setUser(user);
      setName(`${user.firstName} ${user.lastName}`);
      setEmail(user.email || "");
      setRole(user.role || "");
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await client.deleteUser(userId);
      if (fetchUsers) {
        fetchUsers();
      }
      navigate(-1);
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const saveUser = async () => {
    try {
      const [firstName, lastName] = name.split(" ");
      const updatedUser = { 
        ...user, 
        firstName, 
        lastName,
        email,
        role
      };
      await client.updateUser(updatedUser);
      setUser(updatedUser);
      setEditing(false);
      if (fetchUsers) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveUser();
    }
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button 
        onClick={() => navigate(-1)} 
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      
      <hr />
      
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil 
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit" 
          />
        )}
        {editing && (
          <FaCheck 
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save" 
          />
        )}
        {!editing && (
          <div 
            className="wd-name"
            onClick={() => setEditing(true)}
          >
            {user.firstName} {user.lastName}
          </div>
        )}
        {editing && (
          <FormControl 
            className="w-75 wd-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>

      <div className="mt-3">
        {!editing ? (
          <>
            <b>Email:</b>
            <span className="wd-email ms-2">{user.email}</span>
            <br />
            <b>Roles:</b>
            <span className="wd-roles ms-2">{user.role}</span>
            <br />
            <b>Login ID:</b>
            <span className="wd-login-id ms-2">{user.loginId}</span>
            <br />
            <b>Section:</b>
            <span className="wd-section ms-2">{user.section}</span>
            <br />
            <b>Total Activity:</b>
            <span className="wd-total-activity ms-2">{user.totalActivity}</span>
          </>
        ) : (
          <>
            <div className="mb-2">
              <b>Email:</b>
              <FormControl 
                type="email"
                className="wd-edit-email mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="mb-2">
              <b>Role:</b>
              <FormSelect 
                className="wd-edit-role mt-1"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="STUDENT">Student</option>
                <option value="TA">Teaching Assistant</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Administrator</option>
              </FormSelect>
            </div>
            <div className="mb-2">
              <b>Login ID:</b>
              <span className="wd-login-id ms-2">{user.loginId}</span>
            </div>
            <div className="mb-2">
              <b>Section:</b>
              <span className="wd-section ms-2">{user.section}</span>
            </div>
            <div className="mb-2">
              <b>Total Activity:</b>
              <span className="wd-total-activity ms-2">{user.totalActivity}</span>
            </div>
          </>
        )}
      </div>

      <hr />
      
      <div className="mt-3">
        <button 
          onClick={() => deleteUser(uid)} 
          className="btn btn-danger float-end wd-delete"
        >
          Delete
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-secondary float-start me-2 wd-cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
