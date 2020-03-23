import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Logo from '../Logo/Logo';

const LogoNavbar = () => {
    return (
        <Navbar className='text-center justify-content-center' color="light" light expand="md">
            <NavbarBrand href='/' className='d-flex align-items-center'>
                <Logo width='30px' height='30px' /><b>Obelisk</b>
            </NavbarBrand>
        </Navbar>
    );
};

export default LogoNavbar;
