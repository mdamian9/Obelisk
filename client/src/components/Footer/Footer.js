import React from 'react';
import { Navbar } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../Logo/Logo';

const Footer = () => {
    return (
        <Navbar color='light' light expand='md' className='footer justify-content-center'>
            <div href='/home' className='d-flex align-items-center' style={{ margin: '0px' }}>
                <Logo width='30px' height='30px' /><b>Obelisk</b>
            </div>
            &nbsp;|&nbsp;
            <div>
                Copyright &copy; 2020 <a href='https://linkedin.com/in/migueldamian'>Miguel Damian</a>&nbsp;|&nbsp;
                <a href='https://linkedin.com/in/migueldamian'><FontAwesomeIcon size='lg' icon={['fab', 'linkedin']} /></a>&nbsp;
                <a href='https://github.com/mdamian9'><FontAwesomeIcon icon={['fab', 'github']} /></a>&nbsp;
                <a href='https://migueldamian.herokuapp.com/'><FontAwesomeIcon icon='house-user' /></a>&nbsp;| All Rights Reserved
            </div>
        </Navbar>
    );
};

export default Footer;
