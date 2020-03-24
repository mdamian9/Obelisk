import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import LogoNavbar from '../LogoNavbar/LogoNavbar';
import LoginForm from '../LoginForm/LoginForm';

const LoginPage = () => {
    return (
        <div>
            <LogoNavbar />
            <div className="d-flex align-items-center text-white full-r-div">
                <div className="mx-auto" style={{ width: '30%' }}>
                    <Container style={{ width: '100%' }}>
                        <Row>
                            <Col>
                                <h1 className="text-center" style={{ fontSize: '4vh' }}>Log in to your account</h1>
                                <hr />
                                <LoginForm />
                                <hr />
                                <p className="text-center">
                                    Don't have an account? Sign up <Link to="/signup">here</Link>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div >
        </div>
    );
};

export default LoginPage;
