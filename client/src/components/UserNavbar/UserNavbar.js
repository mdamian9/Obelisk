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
                            <NavLink href='/home'>Home</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                New Trade
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href='/new-entry-trade'>
                                    New Entry Trade
                                </DropdownItem>
                                <DropdownItem href='/new-exit-trade'>
                                    New Exit Trade
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Trade Log
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href='/entry-trades'>
                                    Entry Trades Log
                                </DropdownItem>
                                <DropdownItem href='/exit-trades'>
                                    Exit Trades Log
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Tools
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href='/find-percent-change'>
                                    Find % Change
                                </DropdownItem>
                                <DropdownItem href='/get-target-price'>
                                    Get Target Price
                                </DropdownItem>
                                <DropdownItem href='/calculate-roi'>
                                    Calculate ROI
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Menu
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href='/tutorial'>
                                    Tutorial
                                </DropdownItem>
                                <DropdownItem>
                                    My Account
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.handleLogout}>
                                    Log Out
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
