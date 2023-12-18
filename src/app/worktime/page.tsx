'use client'

import { Form, Container, Col, Row, Button, Table } from "react-bootstrap";
import FileUploadButton from "../Components/button/FileUploadButton";

export default function worktime() {
    const active = true;
    return (
        <>
            <Container className="">
                {!active ? '' : <FileUploadButton/>}
                <Form className="border border-dark mt-3 p-3 bg-white">
                    <Form.Group as={Row}>
                        <Form.Label className="col-2">
                            Choose type of list by:
                        </Form.Label>
                        <Col sm='1'>
                            <Form.Check type="radio" label='Month' name="typeoflist" />
                            <Form.Check type="radio" label='Day' name="typeoflist" className="mt-4" />
                        </Col>
                        <Col sm='2'>
                            <Form.Select size="sm" className="mb-3">
                                <option value={0} >This month</option>
                                <option value={1} >Last month</option>
                            </Form.Select>
                            <Form.Group>
                                <Form.Label>From:</Form.Label>
                                <Form.Control type="date" size="sm" />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>To:</Form.Label>
                                <Form.Control type="date" size="sm" />
                            </Form.Group>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Form.Group as={Row}>
                                <Form.Label className="col-sm-6 p-0">Sort by work date:</Form.Label>
                                <Col sm='6'>
                                    <Form.Select size="sm">
                                        <option>Ascending</option>
                                        <option>Descending</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                    <Container className="d-flex justify-content-center mt-3">
                        <Button>Search</Button>
                        <Button className="me-2 mx-2">Reset</Button>
                        <Button>Export Excel</Button>
                    </Container>
                </Form>
            </Container>
            <Container className="">
                <Container className="mt-3 bg-white border border-dark">
                    <Row className="mt-2">
                        <Col>
                            <label>Total number of records: </label>
                        </Col>
                        <Col className="justify-content-end d-flex">
                            <label className="me-2">Sort by work date:</label>
                            <select>
                                <option>--25--</option>
                                <option>--50--</option>
                                <option>--100--</option>
                            </select>
                        </Col>
                    </Row>
                    <Table bordered size="sm" className="mt-2" >
                        <thead>
                            <tr>
                                <th>No</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </Container>
        </>
    )
}