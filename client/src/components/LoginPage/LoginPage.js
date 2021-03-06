import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import LogoNavbar from '../LogoNavbar/LogoNavbar';
import LoginForm from '../LoginForm/LoginForm';
import Footer from '../Footer/Footer';
import AuthService from '../AuthService/AuthService';
import './LoginPage.css';

class LoginPage extends Component {

    constructor() {
        super();
        this.Auth = new AuthService();
    };

    // Do not stay on login page if already logged in
    componentDidMount = () => {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/home');
        };
    };

    render = () => {
        return (
            <div>
                <div className='content'>
                    <LogoNavbar />
                    <br />
                    <div style={{ margin: '0px 20px 0px 20px' }}>
                        <Container id='login' className='border-round-10'>
                            <Row>
                                <Col className='mx-auto' xs='12' sm='10'>
                                    <h4 id='login-header'>Log in to your account</h4>
                                    <hr className='ln-white' />
                                    <LoginForm history={this.props.history} />
                                    <hr className='ln-white' />
                                    <p className='text-center'>
                                        Don't have an account? <br id='br-login' />Sign up <Link to='/signup'>here</Link>
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <br />
                </div>
                <Footer />
            </div>
        );
    };

};

export default LoginPage;
