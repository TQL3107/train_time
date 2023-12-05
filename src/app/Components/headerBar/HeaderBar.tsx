'use client';

import Link from "next/link";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function HeaderBar() {
    return (
        <Navbar className="bg-dark" expand='lg'>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id='header-navbar-nav'>
                    <Nav>
                        <Nav.Link href="/" className="text-white m-1 px-3">Home</Nav.Link>
                        <Nav.Link href="" className="text-white m-1 px-3">Worktime</Nav.Link>
                        <Nav.Link href="" className="text-white m-1 px-3">Staff</Nav.Link>
                        <Nav.Link href="/profile" className="text-white m-1 px-3">Profile</Nav.Link>
                        <Nav.Link href="/leaverequest" className="text-white m-1 px-3">Leave request</Nav.Link>
                        <Nav.Link href="" className="text-white m-1 px-3">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}