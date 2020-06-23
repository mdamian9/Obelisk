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
                    <br />
                    <div style={{ marginLeft: '20px', marginRight: '20px' }}>
                        <Container id='signup' className='border-round-10'>
                            <Row>
                                <Col className='mx-auto' xs='12' sm='10'>
                                    <h4 className='text-center' style={{ marginTop: 10 }}>Create a new account</h4>
                                    <hr />
                                    <SignupForm history={this.props.history} />
                                    <hr />
                                    <p className='text-center'>
                                        Already have an account? <br id='br-signup' />Log in <Link to='/login'>here</Link>
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

export default SignupPage;
