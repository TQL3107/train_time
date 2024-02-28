'use client'

import { Table, Container, Button, Modal, Form, Col, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import axios from "axios";
import { useRouter } from 'next/navigation';
import './page.css';
import Pagination from "../Components/pagination/Pagination";
import {paginate} from '../utils/paginate';
import moment from "moment";

export default function staff() {

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState(0);
    const [roleId, setRoleId] = useState(4);
    const [departmentId, setDepartmentId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [dateStartWork, setDateStartWork] = useState(new Date());
    const [tableData, setTableData] = useState([]);
    const [errors, setErrors] = useState({name: '', email: '', employeeId: '', dateStartWork: ''});
    const [isValid, setIsValid] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const router = useRouter();

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setIsSubmit(false);
    }

    useEffect(() => {
        checkValidate();
    }, [name, email, employeeId, dateStartWork]);

    const checkValidate = () => {
        let errors = {
            name: '',
            email: '',
            employeeId: '',
            dateStartWork: ''
        };

        if (!name) {
            errors.name = 'Name is required.'
        }

        if (!email) {
            errors.email = 'Email is required.'
        } else if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(email) && email) {
            errors.email = 'Email is invalid.'
        }

        if (!employeeId) {
            errors.employeeId = 'Id is required.'
        }

        if (!dateStartWork){
            errors.dateStartWork = 'Date is required.'
        } else if (new Date(dateStartWork) > new Date()) {
            errors.dateStartWork = 'Date is invalid.'
        }

        setErrors(errors);
        setIsValid(errors.name === '' && errors.email === '' && errors.employeeId === '' && errors.dateStartWork === '');
    }

    const addStaff = (e : any) => {
        if (isValid) {
            axios.request({
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                url: `http://localhost:8080/api/admin/adduser`,
                timeout: 5000,
                responseType: "json",
                data: {
                    name: name,
                    email: email,
                    gender: gender,
                    role_id: roleId,
                    department_id: departmentId,
                    employee_id: employeeId,
                    date_start_work: dateStartWork
                }
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    handleClose();
                    window.location.reload();
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            e.preventDefault();
            e.stopPropagation();
            console.log(errors);
        }
        setIsSubmit(true);
    }

    const convertRoleId = (id : any) => {
        switch (id) {
            case 1:
                return 'Admin';
                break;
            case 2:
                return 'Manager';
                break;
            case 3:
                return 'Leader';
                break;
            case 4:
                return 'User';
                break;
            default:
                return 'User';
                break;
        }
    }
    
    useEffect(() => {
        const getTableData = async() => {
            await axios.get('http://localhost:8080/api/admin/getusers')
            .then((response) => {
                console.log(response);
                const data = response.data.users;
                console.log(data);
                setTableData(data);
            })
            .catch((error) => {
                console.log(error);
            })
        }

        getTableData();
    }, []);

    const handlePageChange = (page : any) => {
        setCurrentPage(page);
    };

    const paginateTable = paginate(tableData, currentPage, pageSize);

    const deleteStaff = (userId: any) => {
        axios.request({
            method: 'DELETE',
            url: `http://localhost:8080/api/admin/deleteuser`,
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            timeout: 5000,
            responseType: 'json',
            data: {
                id: userId
            }
        }).then((res) => {
            if (res.status === 200) {
                console.log(res);
                window.location.reload();
            }
        }).catch((e) => {
            console.log(e);
        });
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
                            <Form.Label column sm="4">
                                Name:
                            </Form.Label>
                            <Col>
                                <Form.Control size="sm"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && isSubmit && <p className='error-message'>{errors.name}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="4">
                                Email:
                            </Form.Label>
                            <Col>
                                <Form.Control size="sm"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && isSubmit && <p className='error-message'>{errors.email}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="4">
                                Gender:
                            </Form.Label>
                            <Form.Check type="radio" className="col-3 mt-1" label="Male" name="gender" inline defaultChecked
                                value={0} onClick={(e : any) => setGender(parseInt(e.target.value))}
                            />
                            <Form.Check type="radio" className="col-3 mt-1" label="Female" name="gender" inline
                                value={1} onClick={(e : any) => setGender(parseInt(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="4">
                                Role:
                            </Form.Label>
                            <Form.Check type="radio" className="col-2 mt-1" label="Manager" name="role" inline 
                                value={2} onClick={(e : any) => setRoleId(parseInt(e.target.value))}
                            />
                            <Form.Check type="radio" className="col-2 mt-1" label="Leader" name="role" inline
                                value={3} onClick={(e : any) => setRoleId(parseInt(e.target.value))}
                            />
                            <Form.Check type="radio" className="col-2 mt-1" label="User" name="role" inline defaultChecked
                                value={4} onClick={(e : any) => setRoleId(parseInt(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="4">
                                Department Id:
                            </Form.Label>
                            <Col>
                                <Form.Control size="sm" 
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="4">
                                Employee Id:
                            </Form.Label>
                            <Col>
                                <Form.Control size="sm" 
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                />
                                {errors.employeeId && isSubmit && <p className='error-message'>{errors.employeeId}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="4">
                                Date start work:
                            </Form.Label>
                            <Col>
                                <Form.Control size="sm" type="date"
                                    value={moment(dateStartWork).format('YYYY-MM-DD')}
                                    onChange={(e : any) => setDateStartWork(e.target.value)}
                                />
                                {errors.dateStartWork && isSubmit && <p className='error-message'>{errors.dateStartWork}</p>}
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={(e) => addStaff(e)}>
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
                        <tr >
                            <th className="col-sm-3 text-center">Name</th>
                            <th className="col-sm-1 text-center">Gender</th>
                            <th className="col-sm-1 text-center">Role</th>
                            <th className="col-sm-1 text-center">Department</th>
                            <th className="col-sm-1 text-center">Id</th>
                            <th className="col-sm-2 text-center">Phone</th>
                            <th className="col-sm-3 text-center">Address</th>
                            <th className="col-sm-1 text-center">Setting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginateTable.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.gender == 1 ? "Female" : "Male"}</td>
                                    <td>{convertRoleId(user.role_id)}</td>
                                    <td>{user.department}</td>
                                    <td>{user.employee_id}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td><Button type="button" className="btn btn-danger btn-sm"
                                        onClick={() => deleteStaff(user.id)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Container className="d-flex justify-content-center">
                <Pagination 
                    items={tableData.length} 
                    currentPage={currentPage} 
                    pageSize={pageSize} 
                    onPageChange={handlePageChange}
                />
                </Container>
                
            </Container>
            
        </>
    )
}