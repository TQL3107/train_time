'use client'

import React from "react";
import '../footer/Footer.css';
import { Container, Col, Row, Image } from "react-bootstrap";

export default function FooterBar() {
    return(
        <>
            <footer>
                <Container fluid className="bg-gray mt-3 m-0 pad-1" as={Row}>
                    <Col className="mt-3 pad-1 text-center" md='4' sm='6' lg='4'>
                        <h4 className="">
                            <Image width="150px" height="150px" src="https://zotek8.com/wp-content/uploads/2023/07/Zotek8_logo_no-slogan_1-1024x1024.png" />
                        </h4>
                    </Col>
                    <Col className="mt-5 m-0 pad-1" md='3' sm='6' lg='3'>
                        <h4 className="text-uppercase">Zotek8</h4>
                        <p className="mb-0">
                            <a href="https://zotek8.com/en/about-us/" className="text-reset">About Us</a>
                        </p><hr className="mb-2 mt-2"/>
                        <p className="mb-0">
                            <a href="https://zotek8.com/en/portfolio/" className="text-reset">Portfolio</a>
                        </p><hr className="mb-2 mt-2"/>
                        <p className="mb-0">
                            <a href="https://zotek8.com/en/recruitment/" className="text-reset">Recruitment</a>
                        </p><hr className="mb-2 mt-2"/>
                        <p className="mb-0">
                            <a href="https://zotek8.com/en/news-blog/" className="text-reset">New & Blogs</a>
                        </p>
                    </Col>
                    <Col className="mt-5 m-0 pad-1" md='3' sm='6' lg='3'>
                        <h4 className="text-uppercase">Our Service</h4>
                        <p className="mb-0">
                            <a href="https://zotek8.com/en/web-system-development/" className="text-reset">Web Development</a>
                        </p><hr className="mb-2 mt-2"/>
                        <p className="mb-0">
                            <a href="https://zotek8.com/en/mobile-app-development/" className="text-reset">Mobile App Development</a>
                        </p><hr className="mb-2 mt-2"/>
                        <p className="mb-0">
                            <a href="https://zotek8.com/en/windows-app-development/" className="text-reset">Window App Development</a>
                        </p><hr className="mb-2 mt-2"/>
                        <p className="mb-0">
                            <a href="https://zotek8.com/en/infra-consultant/" className="text-reset">Infra Consultant</a>
                        </p><hr className="mb-2 mt-2"/>
                        <p className="mb-0">
                            <a href="https://zotek8.com/en/advanced-technology/" className="text-reset">Advanced Tecnology</a>
                        </p>
                    </Col>
                    <Col className="mt-5 m-0 pad-1" md='2' sm='6' lg='2'>
                        <h4 className="">Documentations</h4>
                        <p className="mb-0">
                            <a href="https://zotek8.com/en/privacy-policy/" className="text-reset">Privacy Policy</a>
                        </p>
                    </Col>
                </Container>
                <Container fluid className="bg-gray m-0 pad-1" as={Row}>
                    <Col className="mt-3 pad-1 text-center" md='4' sm='6' lg='4'>
                        <p className="">
                            Copyright 2023 © Zotek8
                        </p>
                    </Col>
                    <Col className="mt-3 m-0 pad-1" md='3' sm='6' lg='3'>
                        <p>
                            <i className="bi bi-telephone-fill me-2 secondary"></i>(+84) 85 2222 311 – Vietnamese
                        </p>
                        <p>
                            <i className="bi bi-telephone-fill me-2 secondary"></i>(+81) 807951 9669 – Japanese
                        </p>
                    </Col>
                    <Col className="mt-3 m-0 pad-1" md='3' sm='6' lg='3'>
                        <p>
                            <i className="bi bi-envelope-fill secondary me-2"></i>
                            contant@zotek8.com
                        </p>
                    </Col>
                </Container>
            </footer>
        </>
    )
}