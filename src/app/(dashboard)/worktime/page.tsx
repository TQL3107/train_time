'use client'

import { Form, Container, Col, Row, Button, Table, Pagination } from "react-bootstrap";
import FileUploadButton from "../Components/button/FileUploadButton";
import { useState, useEffect } from "react";
import axios from "axios";

export default function worktime() {

    const INITIAL_PAGE = 1;
    const INITIAL_PER_PAGE = 50;

    const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [sortOption, setSortOption] = useState('ASC');
    const [optionMonth, setOptionMonth] = useState(0);
    const [searchOption, setSearchOption] = useState(1);

    const handleSubmit = () => {
        
    }

    const handleSelectPerPage = (e:any) => {
        setPerPage(e.target.value);
        console.log(perPage);  
    }

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
                            <Form.Check type="radio" label='Month' name="typeoflist" defaultChecked={true} value={1}
                                onChange={(e:any) => setSearchOption(parseInt(e.target.value))} />
                            <Form.Check type="radio" label='Day' name="typeoflist" className="mt-4" value={2}
                                onChange={(e:any) => setSearchOption(parseInt(e.target.value))} />
                        </Col>
                        <Col sm='2'>
                            <Form.Select size="sm" className="mb-3" defaultValue={optionMonth} onChange={(e:any) => setOptionMonth(parseInt(e.target.value))}>
                                <option value={0} >This month</option>
                                <option value={1} >Last month</option>
                            </Form.Select>
                            <Form.Group>
                                <Form.Label>From:</Form.Label>
                                <Form.Control type="date" size="sm" onChange={(e:any) => setStartDate(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>To:</Form.Label>
                                <Form.Control type="date" size="sm" onChange={(e:any) => setEndDate(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Form.Group as={Row}>
                                <Form.Label className="col-sm-6 p-0">Sort by work date:</Form.Label>
                                <Col sm='6'>
                                    <Form.Select size="sm" defaultValue={sortOption} onChange={(e:any) => {setSortOption(e.target.value)}}>
                                        <option value={'ASC'}>Ascending</option>
                                        <option value={'DESC'}>Descending</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                    <Container className="d-flex justify-content-center mt-3">
                        <Button onClick={handleSubmit}>Search</Button>
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
                            <select defaultValue={perPage} onChange={(e) => handleSelectPerPage(e)}>
                                <option value={25}>--25--</option>
                                <option value={50}>--50--</option>
                                <option value={100}>--100--</option>
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