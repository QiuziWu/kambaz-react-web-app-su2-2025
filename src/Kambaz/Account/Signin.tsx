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


  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } catch (error: any) {
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