import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    <Col className="wd-dashboard-course" style={{ width: "260px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        Full Stack software developer</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "260px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/2345/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS2345 Node JS</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        Backend Development with Express</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "260px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/3456/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3456 Databases</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        SQL and NoSQL Fundamentals</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "260px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/4567/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4567 Python</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        Data Structures and Algorithms</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "260px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/5678/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5678 Java</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        Object-Oriented Programming</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "260px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/6789/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS6789 Machine Learning</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        Intro to AI and ML Models</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    <Col className="wd-dashboard-course" style={{ width: "260px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/7890/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS7890 Web Dev</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        Modern Frontend Technologies</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}