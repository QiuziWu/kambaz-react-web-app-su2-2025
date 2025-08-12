import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "");
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <div id="wd-account-navigation">
      {links.includes("Signin") && (
        <Link to="/Kambaz/Account/Signin">Signin</Link>
      )} <br />
      {links.includes("Signup") && (
        <Link to="/Kambaz/Account/Signup">Signup</Link>
      )} <br />
      {links.includes("Profile") && (
        <Link to="/Kambaz/Account/Profile">Profile</Link>
      )} <br />
      {currentUser && currentUser.role === "ADMIN" && (
        <Link to="/Kambaz/Account/Users">Users</Link>
      )}

    </div>
  );
}