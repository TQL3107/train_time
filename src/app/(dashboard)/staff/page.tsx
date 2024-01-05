'use client'

import { Table, Container, Button, Modal, Form, Col, Row } from "react-bootstrap"
import { useState } from "react"

export default function staff() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sex, setSex] = useState(0);
    const [code, setCode] = useState('');
    const [dateStartWork, setDateStartWork] = useState(new Date());

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const addStaff = () => {
        console.log(name, sex, code, dateStartWork);
        handleClose();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="2">
                                Name:
                            </Form.Label>
                            <Col>
                                <Form.Control required size="sm"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="2">
                                Email:
                            </Form.Label>
                            <Col>
                                <Form.Control required size="sm"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="2">
                                Sex:
                            </Form.Label>
                            <Form.Check type="radio" className="col-3 mt-1" label="Male" name="sex" inline 
                                value={0} onClick={(e : any) => setSex(parseInt(e.target.value))}
                            />
                            <Form.Check type="radio" className="col-3 mt-1" label="Female" name="sex" inline
                                value={1} onClick={(e : any) => setSex(parseInt(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="2">
                                Code:
                            </Form.Label>
                            <Col>
                                <Form.Control required size="sm" 
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="4">
                                Date start work:
                            </Form.Label>
                            <Col>
                                <Form.Control required size="sm" type="date"
                                    onChange={(e : any) => setDateStartWork(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={addStaff}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container fluid>
                <h2>List of Staff</h2>
                <Container className="justify-content-end d-flex">
                    <Button onClick={handleShow}>Add</Button>
                </Container>
            </Container>
            <Container className="mt-3">
                <Table bordered>
                    <thead>
                        <tr>
                            <th className="col-sm-3 text-center">Name</th>
                            <th className="col-sm-1 text-center">Sex</th>
                            <th className="col-sm-2 text-center">Code</th>
                            <th className="col-sm-2 text-center">Phone</th>
                            <th className="col-sm-3 text-center">Address</th>
                            <th className="col-sm-1 text-center">Setting</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>Male</td>
                            <td>A01234567</td>
                            <td>1234567890</td>
                            <td>Đường ..., Quận ..., Hà Nội</td>
                            <td><Button className="btn" size="sm">Delete</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            
        </>
    )
}