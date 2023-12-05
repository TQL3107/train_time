'use client'

import { useState } from "react"
import { Container, Button, Form, Row, Col } from "react-bootstrap"

export default function leaveRequest() {
    const [name, setName] = useState('');
    const [timeOfRequest, setTimeOfRequest] = useState('');
    const [typeOfRequest, setTypeOfRequest] = useState('');
    const [reason, setReason] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numberOfTimeRequest, setNumberOfTimeRequest] = useState(0);

    const handleSubmit = (e : any) => {
        console.log(name, numberOfTimeRequest, timeOfRequest, typeOfRequest, reason );
    }
    return (
        <>
            <Container className="mt-4" fluid>
                <Container className="col-6 border border-2 border-black" fluid>
                    <Form>
                        <Container className="d-flex align-items-center justify-content-center">
                            <h3>Leave Request Form</h3>
                        </Container>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="3" className="">
                                Name:
                            </Form.Label>
                            <Col>
                                <Form.Control required size="sm" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-2">
                            <Form.Label column sm="3" className="pt-0">
                                Time of request:
                            </Form.Label>
                            <Col>
                                <input type="number" className="me-2 col-2" id="timeofrequest" 
                                    onChange={(e : any) => setNumberOfTimeRequest(e.target.value)}/>
                                <Form.Check inline name="timeRequest" type="radio" label="Days" 
                                    value={"Day"}
                                    onClick={(e : any) => setTimeOfRequest(e.target.value)}
                                />
                                <Form.Check inline name="timeRequest" type="radio" label="Hours" 
                                    value={"Hour"}
                                    onClick={(e : any) => setTimeOfRequest(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-2">
                            <Form.Label column sm="3" className="">
                                Date of absence:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="5">From: </Form.Label>
                                    <Form.Control type="date" size="sm" className="w-50" 
                                        onChange={(e : any) => setStartDate(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col sm="4">
                                <Form.Group as={Row} className="">
                                    <Form.Label column sm="5">To: </Form.Label>
                                    <Form.Control type="date" size="sm" className="w-50" 
                                        onChange={(e : any) => setEndDate(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Type of request:</Form.Label>
                            <Col className="ms-3">
                                <Form.Check type="radio" name="typeRequest" label="Vacation" className="col-sm-3" inline 
                                    value={"Vacation"} 
                                    onClick={(e : any) => setTypeOfRequest(e.target.value)}
                                />
                                <Form.Check type="radio" name="typeRequest" label="Medical Leave" className="col-sm-3" inline 
                                    value={"Medical Leave"} 
                                    onClick={(e : any) => setTypeOfRequest(e.target.value)}
                                />
                                <Form.Check type="radio" name="typeRequest" label="Personal Leave" className="col-sm-4" inline 
                                    value={"Personal Leave"} 
                                    onClick={(e : any) => setTypeOfRequest(e.target.value)}
                                />
                                <Form.Check type="radio" name="typeRequest" label="Family Reasons" className="col-sm-3" inline 
                                    value={"Family Reasons"} 
                                    onClick={(e : any) => setTypeOfRequest(e.target.value)}
                                />
                                <Form.Check type="radio" name="typeRequest" label="Bereavement" className="col-sm-3" inline
                                    value={"Bereavement"} 
                                    onClick={(e : any) => setTypeOfRequest(e.target.value)}
                                />
                                <Form.Check type="radio" name="typeRequest" label="Time off without pay" className="col-sm-4" inline 
                                    value={"Time off without pay"} 
                                    onClick={(e : any) => setTypeOfRequest(e.target.value)}
                                />
                                <Form.Check type="radio" name="typeRequest" label="Other:" className="col-sm-3" inline 
                                    value={"Other"} 
                                    onClick={(e : any) => setTypeOfRequest(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Reason: </Form.Label>
                            <Form.Control as="textarea" rows={3}
                                required = {typeOfRequest === "Other" ? true : false}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Form.Group>
                        <div className="m-3 align-items-center justify-content-center d-flex">
                            <Button type="submit" onClick={(e) => handleSubmit(e)}>Request</Button>
                        </div>
                    </Form>
                </Container>
            </Container>
        </>
    )
}