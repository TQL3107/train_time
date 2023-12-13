'use client'

import { Container, Nav, Navbar, Button } from "react-bootstrap";
import '../headerBar/HeaderBar.css';

export default function HeaderBar() {
    return (
        <Container fluid className="m-0 p-0">
            <Navbar className="bg-dark" expand='lg'>
                <Container>
                    <Navbar.Collapse id='header-navbar-nav'>
                        <Nav>
                            <Button className="btn btn-dark">
                                <i className="bi bi-list"></i>
                            </Button>
                            <Nav.Link href="/" className="text-white m-1 px-3">
                                <img width="50px" height="50px" src="https://zotek8.com/wp-content/uploads/2023/07/Zotek8_logo_no-slogan_1-1024x1024.png" />
                                Home
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    )
}