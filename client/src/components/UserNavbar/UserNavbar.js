import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../AuthService/AuthService';
import Logo from '../Logo/Logo';

const Auth = new AuthService();

class UserNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false
        };
    };

    toggleCollapse = () => {
        this.setState(prevState => ({
            collapseOpen: !prevState.collapseOpen
        }));
    };

    handleLogout = () => {
        Auth.logout();
        this.props.history.replace('/');
    };

    render = () => {
        return (
            <Navbar color='light' light expand='md'>
                <NavbarBrand href='/home' className='d-flex align-items-center'>
                    <Logo width='30px' height='30px' /><b>Obelisk</b>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleCollapse} />
                <Collapse isOpen={this.state.collapseOpen} navbar>
                    <Nav className='ml-auto' navbar>
                        <NavItem>
                            <NavLink href='/home'><FontAwesomeIcon icon='home' /> Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/new-entry-trade'><FontAwesomeIcon icon='file-import' /> New Entry Trade</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Trade Log
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href='/entry-trades'>
                                    <FontAwesomeIcon icon='file-import' /> Entry Trade Log
                                </DropdownItem>
                                <DropdownItem href='/exit-trades'>
                                    <FontAwesomeIcon icon='file-export' /> Exit Trade Log
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Tools
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href='/find-percent-change'>
                                    <FontAwesomeIcon icon='chart-line' /> Find % Change
                                </DropdownItem>
                                <DropdownItem href='/get-target-price'>
                                    <FontAwesomeIcon icon='search-dollar' /> Get Target Price
                                </DropdownItem>
                                <DropdownItem href='/calculate-roi'>
                                    <FontAwesomeIcon icon='hand-holding-usd' /> Calculate ROI
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Menu
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href='/tutorial'>
                                    <FontAwesomeIcon icon='clipboard-list' /> Tutorial
                                </DropdownItem>
                                <DropdownItem href='/wallet'>
                                    <FontAwesomeIcon icon='wallet' /> Wallet
                                </DropdownItem>
                                <DropdownItem href='/account'>
                                    <FontAwesomeIcon icon='user-circle' /> Account
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.handleLogout}>
                                    <FontAwesomeIcon icon='sign-out-alt' /> Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    };

};

export default UserNavbar;
