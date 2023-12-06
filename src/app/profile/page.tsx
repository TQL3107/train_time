'use client'

import { Container, Image, Col, Row, Button } from "react-bootstrap"
import Link from "next/link"

export default function profile() {

    return (
        <>
            <Container className="">
                <Container className="col-sm-4 m-0" fluid>
                    <Image src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" className="w-50" roundedCircle/>
                    <Button className="btn" href="/editprofile">Edit</Button>
                </Container>
                <Container as={Row}>
                    <Col >
                        <Row>
                            <p className="col-sm-4">Name: </p>
                            
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Birthday: </p>
                            
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Employee code: </p>
                            
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">CCCD: </p>
                            
                        </Row><br/>
                    </Col>
                    <Col md={2}>
                    </Col>
                    <Col>
                        <Row>
                            <p className="col-sm-4">Sex: </p>
                            
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Phone: </p>
                            
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Address: </p>
                            
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Date start work: </p>

                        </Row><br/>
                    </Col>
                </Container>
                
            </Container>
        </>
    )
}