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
                    <Container id='login' className='text-white section-solid-white' style={{ marginTop: '17vh' }}>
                        <Row>
                            <Col className='mx-auto' xs={8}>
                                <h3 className='text-center' style={{marginTop: 10}}>Log in to your account</h3>
                                <hr className='ln-white' />
                                <LoginForm history={this.props.history} />
                                <hr className='ln-white' />
                                <p className='text-center'>
                                    Don't have an account? Sign up <Link to='/signup'>here</Link>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                    <br />
                </div>
                <Footer />
            </div>
        );
    };

};

export default LoginPage;
