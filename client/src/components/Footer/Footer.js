import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Logo from '../Logo/Logo';

const Footer = () => {
    return (
        <Navbar color='light' light expand='md' className='footer justify-content-center' style={style}>
            <NavbarBrand href='/home' className='d-flex align-items-center' style={{ margin: '0px' }}>
                <Logo width='30px' height='30px' /><b>Obelisk</b>&nbsp;|&nbsp;
            </NavbarBrand>
            <div>
                Copyright &copy; 2020 <a href='https://linkedin.com/in/migueldamian'>Miguel Damian</a> | All Rights Reserved
            </div>
        </Navbar>
    );
};

const style = {
    position: 'fixed',
    width: '100%',
    left: 0,
    bottom: 0
};

export default Footer;
