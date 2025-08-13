import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 添加调试信息
  console.log("Environment variables:", {
      VITE_HTTP_SERVER: import.meta.env.VITE_HTTP_SERVER,
      NODE_ENV: import.meta.env.NODE_ENV
  });

  const signin = async () => {
    try {
      console.log("Attempting to signin with credentials:", credentials);
      
      const user = await client.signin(credentials);
      console.log("Signin successful:", user);
      
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } catch (error: any) {
      console.error("Signin failed:", error);
      console.error("Error status:", error.response?.status);
      console.error("Error message:", error.response?.data);
      alert("Login failed. Please check your username and password.");
    }
  };

  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <Form.Control defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        placeholder="username" className="mb-2" id="wd-kambaz-signin-username" />
      <Form.Control defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="password" type="password" className="mb-2" id="wd-kambaz-signin-password" />
      <Button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100 mb-2"> Sign in </Button>
      <Link to="/Kambaz/Account/Signup" id="wd-signup-link">Sign up</Link>
    </div>
  );
}