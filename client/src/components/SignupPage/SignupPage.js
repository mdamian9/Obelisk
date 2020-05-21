import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import LogoNavbar from '../LogoNavbar/LogoNavbar';
import SignupForm from '../SignupForm/SignupForm';
import AuthService from '../AuthService/AuthService';
import './SignupPage.css';

class SignupPage extends Component {

    constructor() {
        super();
        this.Auth = new AuthService();
    };

    componentDidMount = () => {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/home');
        };
    };

    render = () => {
        return (
            <div>
                <LogoNavbar />
                <div className="d-flex align-items-center text-white full-r-div">
                    <Container id='signup' className='section-solid-white'>
                        <Row>
                            <Col>
                                <h4 className="text-center">Create a new account</h4>
                                <hr />
                                <SignupForm history={this.props.history} />
                                <hr />
                                <p className="text-center">
                                    Already have an account? Log in <Link to="/login">here</Link>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };
};

export default SignupPage;
