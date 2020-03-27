import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import LogoNavbar from '../LogoNavbar/LogoNavbar';
import LoginForm from '../LoginForm/LoginForm';
import AuthService from '../AuthService/AuthService';

class LoginPage extends Component {

    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
        this.Auth = new AuthService();
    }

    // Do not stay on log in page if already logged in
    componentWillMount = () => {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/home');
        };
    };

    handleLogin = (username, password) => {
        // Once the user is logged in, redirect them to their user home page
        this.Auth.login(username, password).then(() => {
            this.props.history.replace('/home');
        }).catch(err => {
            console.log(err);
            // alert(err.response.data.message);
        });
    };

    render = () => {

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
                                    <LoginForm handleLogin={this.handleLogin} />
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
    }
};

export default LoginPage;
