'use client'

import { useEffect, useState } from "react"
import { Container, Button, Form, Row, Col } from "react-bootstrap"
import './page.css'
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function leaveRequest() {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState<string | null>('');
    const [timeOfRequest, setTimeOfRequest] = useState('Day');
    const [typeOfRequest, setTypeOfRequest] = useState('Personal Leave');
    const [reason, setReason] = useState('');
    const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [numberOfTimeRequest, setNumberOfTimeRequest] = useState(0);
    const [errors, setErrors] = useState({name: '', numberOfTimeRequest: '', startDate: '', endDate: ''})
    const [isValid, setIsValid] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [role, setRole] = useState('');
    const [isManage, setIsManage] = useState(false);

    const router = useRouter();

    const validateForm = () => {
        let errors = {
            name: '',
            numberOfTimeRequest: '',
            startDate: '',
            endDate: ''
        };

        const today = moment(new Date()).format('YYYY-MM-DD');

        if (!name) {
            errors.name = 'Name is required.'
        }

        if (timeOfRequest === 'Hour') {
            if (numberOfTimeRequest === 0) {
                errors.numberOfTimeRequest = 'Number of hours is required.'
            } else if (numberOfTimeRequest > 8) {
                errors.numberOfTimeRequest = 'Number of hours is invalid.'
            }
        }

        if (new Date(startDate).getTime() < new Date(today).getTime()) {
            errors.startDate = 'Invalid date.'
        }

        if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
            errors.endDate = 'Invalid.'
        }

        setErrors(errors);
        setIsValid(errors.name === '' && errors.numberOfTimeRequest === '' && errors.startDate === '' && errors.endDate === '');
    }

    const convertRoleId = (id : any) => {
        switch (id) {
            case '1':
                return 'Admin';
                break;
            case '2':
                return 'Manager';
                break;
            case '3':
                return 'Leader';
                break;
            case '4':
                return 'User';
                break;
            default:
                return 'User';
                break;
        }
    }

    useEffect(() => {
        validateForm();
    }, [name, startDate, endDate, timeOfRequest, numberOfTimeRequest]);

    useEffect(() => {
        const id = localStorage.getItem('userId');
        const roleId = localStorage.getItem('userRoleId');
        setUserId(id);
        setRole(convertRoleId(roleId));
        setIsManage(role === 'Admin' || role === 'Leader' || role === 'Manager');
        console.log(userId);
        console.log(role);
        console.log(isManage);
    }, [userId, role, isManage])

    const handleSubmit = async(e : any) => {
        if (isValid) {
            await axios.request({
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: `http://localhost:8080/api/user/leaverequest`,
                timeout: 5000,
                responseType: 'json',
                data: {
                    id: userId,
                    startDate: startDate,
                    endDate: endDate,
                    timeOfRequest: timeOfRequest,
                    numberOfTimeRequest: numberOfTimeRequest,
                    typeOfRequest: typeOfRequest,
                    reason: reason
                }
            }).then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    return router.push('/myrequests');
                }
            }).catch((error) => {
                console.log(error);
                e.preventDefault();
            });
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log(errors);
        setIsSubmit(true);
    }

    return (
        <>
            <Container className="mt-4" fluid>
                <Container className="" fluid>
                    <Form>
                        <Container className="d-flex align-items-center justify-content-center">
                            <h3>Leave Request Form</h3>
                        </Container>
                        <Form.Group as={Row} className="mt-3">
                            <Form.Label column sm="2" className="">
                                Name:
                            </Form.Label>
                            <Col>
                                <Form.Control size="sm" className="border border-dark"
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && isSubmit && <p className='error-message'>{errors.name}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-2">
                            <Form.Label column sm="2" className="pt-0">
                                Time of request:
                            </Form.Label>
                            <Col>
                                <input type="number" className="me-2 col-2" id="timeofrequest"
                                    required = {timeOfRequest === 'Hour' ? true : false}
                                    onChange={(e : any) => setNumberOfTimeRequest(e.target.value)}/>
                                <Form.Check inline name="timeRequest" type="radio" label="Days" 
                                    value={"Day"} defaultChecked
                                    onClick={(e : any) => setTimeOfRequest(e.target.value)}
                                />
                                <Form.Check inline name="timeRequest" type="radio" label="Hours" 
                                    value={"Hour"}
                                    onClick={(e : any) => setTimeOfRequest(e.target.value)}
                                />
                                {errors.numberOfTimeRequest && isSubmit && <p className='error-message'>{errors.numberOfTimeRequest}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-2">
                            <Form.Label column sm="2" className="">
                                Date of absence:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">From: </Form.Label>
                                    <Form.Control type="date" size="sm" className="w-50 border border-dark"
                                        value={startDate}
                                        onChange={(e : any) => setStartDate(e.target.value)} />
                                        
                                </Form.Group>
                                {errors.startDate && isSubmit && <p className='error-message'>{errors.startDate}</p>}
                            </Col>
                            <Col sm="4">
                                <Form.Group as={Row} className="">
                                    <Form.Label column sm="4">To: </Form.Label>
                                    <Form.Control type="date" size="sm" className="w-50 border border-dark"
                                        value={endDate}
                                        onChange={(e : any) => setEndDate(e.target.value)} />
                                </Form.Group>
                                {errors.endDate && isSubmit && <p className='error-message'>{errors.endDate}</p>}
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
                                    value={"Personal Leave"} defaultChecked
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
                            <Form.Control as="textarea" rows={3} className="border border-dark"
                                required = {typeOfRequest === "Other" ? true : false}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Form.Group>
                        <div className="m-3 align-items-center justify-content-center d-flex">
                            {isManage && <Button type="button" onClick={() => router.push("/allrequests")}>All Request</Button>}
                            <Button type="button" className="ms-2" onClick={(e) => handleSubmit(e)}>Request</Button>
                            <Button type="button" className="ms-2" onClick={() => router.push("/myrequests")}>My Request</Button>
                        </div>
                    </Form>
                </Container>
            </Container>
        </>
    )
}