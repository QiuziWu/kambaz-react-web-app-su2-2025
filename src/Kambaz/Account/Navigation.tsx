import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
export default function AccountNavigation() {
  return (
    <ListGroup className="wd fs-5 rounded-0">
      <ListGroup.Item as={Link} to={`/Kambaz/Account/Signin`} className="active border border-0" > Signin  </ListGroup.Item>
      <ListGroup.Item as={Link} to={`/Kambaz/Account/Signup`} className="text-danger border border-0" > Signup  </ListGroup.Item>
      <ListGroup.Item as={Link} to={`/Kambaz/Account/Profile`} className="text-danger border border-0" > Profile </ListGroup.Item>
    </ListGroup>
  );
}