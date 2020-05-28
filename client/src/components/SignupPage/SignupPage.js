import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Footer from '../Footer/Footer';
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
                <div className='content'>
                    <LogoNavbar />
                    <Container id='signup' className='text-white section-solid-white' style={{marginTop: '12vh'}}>
                        <Row>
                            <Col className='mx-auto' xs={8}>
                                <h3 className='text-center' style={{marginTop: 10}}>Create a new account</h3>
                                <hr className='ln-white' />
                                <SignupForm history={this.props.history} />
                                <hr className='ln-white' />
                                <p className='text-center'>
                                    Already have an account? Log in <Link to='/login'>here</Link>
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

export default SignupPage;
