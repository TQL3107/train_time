'use client'

import { Container, Nav, Navbar, Button, NavDropdown, Row, Image, Overlay, ListGroup } from "react-bootstrap";
import { useState, useRef } from "react";
import '../headerBar/HeaderBar.css';

export default function HeaderBar() {
    const [showOption, setShowOption] = useState(false);
    const target = useRef(null);

    const handleOptions = () => {
        setShowOption(!showOption);
    }
    return (
        <>
            <Container fluid className="m-0 p-0">
                <Navbar className="bg-dark" expand='lg'>
                    <Container as={Row} fluid>
                        <Navbar.Collapse id='header-navbar-nav' className="col-sm-11">
                            <Nav>
                                <Button className="btn btn-dark">
                                    <i className="bi bi-list"></i>
                                </Button>
                                <Nav.Link href="/" className="text-white m-1 px-3">
                                    Home
                                </Nav.Link>
                                <Nav.Link href="https://zotek8.com/en/about-us/" className="text-white m-1 px-3">
                                    About Us
                                </Nav.Link>
                                <NavDropdown title="Our Service" className="m-1 px-3" id="list-nav">
                                    <NavDropdown.Item href="https://zotek8.com/en/web-system-development/">Web Development</NavDropdown.Item>
                                    <NavDropdown.Item href="https://zotek8.com/en/mobile-app-development/">Mobile App Development</NavDropdown.Item>
                                    <NavDropdown.Item href="https://zotek8.com/en/windows-app-development/">Window App Development</NavDropdown.Item>
                                    <NavDropdown.Item href="https://zotek8.com/en/infra-consultant/">Infra Consultant</NavDropdown.Item>
                                    <NavDropdown.Item href="https://zotek8.com/en/advanced-technology/">Advanced Tecnology</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        <Container className="col" onClick={handleOptions} ref={target}>
                                <Image fluid src="https://zotek8.com/wp-content/uploads/2023/07/Zotek8_logo_no-slogan_1-1024x1024.png" roundedCircle className="bg-white" /> 
                        </Container>
                        <Overlay target={target.current} show={showOption} placement="bottom">
                            {({
                                placement: _placement,
                                arrowProps: _arrowProps,
                                show: _show,
                                popper: _popper,
                                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                                ...props
                            }) => (
                                <div {...props}>
                                    <ListGroup>
                                        <ListGroup.Item href="/" action>
                                            Log out
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            )}
                        </Overlay>
                    </Container>
                </Navbar>
            </Container>
        </>
    )
}