'use client'

import { Container, Col, Row, Image, Button, Form, Alert } from "react-bootstrap"
import { useState } from 'react'

export default function editProfile() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [employeeCode, setEmployeeCode] = useState('');
    const [code, setCode] = useState('');
    const [sex, setSex] = useState(0);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = () => {
        
    }
    return (
        <>
            <Alert show={show} >
                <Alert.Heading>Unsave change</Alert.Heading>
                <p>Your change will not be saved</p>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} className="btn m-1">
                        Close
                    </Button>
                    <Button href="/profile" className="btn m-1">OK</Button>
                </div>
            </Alert>
            <Container className="">
                <Container className="col-sm-4 m-0" fluid>
                    <Image src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" className="w-50" roundedCircle/>
                    <Button className="btn">Change Avatar</Button>
                </Container>
                <Container as={Row}>
                    <Col >
                        <Row>
                            <p className="col-sm-4">Name: </p>
                            <Form.Control className="col" type="text"
                                value={name} onChange={(e) => setName(e.target.value)} 
                            />
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Birthday: </p>
                            <Form.Control className="col" type="date" 
                                onChange={(e : any) => setBirthday(e.target.value)}
                            />
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Employee code: </p>
                            <Form.Control className="col" type="text" 
                                value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)}
                            />
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">CCCD: </p>
                            <Form.Control className="col" type="text" 
                                value={code} onChange={(e) => setCode(e.target.value)}
                            />
                        </Row><br/>
                    </Col>
                    <Col md={2}>
                    </Col>
                    <Col>
                        <Row>
                            <p className="col-sm-4">Sex: </p>
                            <Form.Check type="radio" className="col" label="Male" name="sex" inline 
                                value={0} onClick={(e : any) => setSex(parseInt(e.target.value))}
                            />
                            <Form.Check type="radio" className="col" label="Female" name="sex" inline
                                value={1} onClick={(e : any) => setSex(parseInt(e.target.value))}
                            />
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Phone: </p>
                            <Form.Control className="col" type="text"
                                value={phone} onChange={(e) => setPhone(e.target.value)}
                            />
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Address: </p>
                            <Form.Control className="col" type="text"
                                value={address} onChange={(e) => setAddress(e.target.value)}
                            />
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Date start work: </p>

                        </Row><br/>
                    </Col>
                </Container>
                <Container fluid className="d-flex justify-content-center mt-3">
                    <Button className="btn m-2" onClick={() => handleSubmit()}>Save</Button>
                    <Button className="btn m-2" onClick={() => setShow(true)}>Cancel</Button>
                </Container>
            </Container>
        </>
    )
}