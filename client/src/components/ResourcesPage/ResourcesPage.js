import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../Footer/Footer';
import withAuth from '../withAuth/withAuth';

class ResourcesPage extends Component {

    constructor(props) {
        super(props);
    };

    render = () => {
        return (
            <div>
                <div className='content'>
                    <UserNavbar history={this.props.history} />
                    <br />
                    <Container>
                        <Row>
                            <Col xs={10} className='section-solid-white text-white mx-auto'>
                                <h3 className='text-center'>
                                    Resources
                                </h3>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        );
    };

};

export default withAuth(ResourcesPage);
