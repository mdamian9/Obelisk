import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Navbar, NavbarBrand, Nav } from 'reactstrap';
import Logo from '../Logo/Logo';

class LandingNavbar extends Component {

    render = () => {
        return (
            <Navbar color='light' light expand='md'>
                <NavbarBrand href='/'>
                    <Logo />
                </NavbarBrand>
            </Navbar>
        );
    };

};

export default LandingNavbar;

