'use client'

import { Container, Col, Row, Image, Button, Form, Modal } from "react-bootstrap"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import moment from "moment";
import axios from "axios";
import './page.css';

export default function editProfile() {
    const data = typeof window !== 'undefined' ? localStorage.getItem('myProfile') : null;
    const myProfileData = data !== null ? JSON.parse(data) : null;

    const [show, setShow] = useState(false);
    const [name, setName] = useState(myProfileData !== null ? myProfileData.name : '');
    const [birthday, setBirthday] = useState(myProfileData !== null ? new Date(myProfileData.birthday) : new Date());
    const [employeeId, setEmployeeId] = useState(myProfileData !== null ? myProfileData.employee_id : '');
    const [citizenID, setCitizenID] = useState(myProfileData !== null ? myProfileData.citizen_id : '');
    const [phone, setPhone] = useState(myProfileData !== null ? myProfileData.phone : '');
    const [address, setAddress] = useState(myProfileData !== null ? myProfileData.address : '');
    const [isValid, setIsValid] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [errors, setErrors] = useState({birthday: '', phone: '', citizenID: ''});

    const router = useRouter();

    const handleClose = () => setShow(false);

    const validInfomation = () => {
        const errors = {birthday: '', phone: '', citizenID: ''};
        if (new Date().getFullYear() - new Date(birthday).getFullYear() < 18) {
            errors.birthday = 'Birthday is invalid.'
        }

        if (citizenID.length != 12) {
            errors.citizenID = 'CitizenId is invalid.'
        }

        if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone)) {
            errors.phone = 'Phone is invalid.'
        }

        setErrors(errors);
        setIsValid(errors.birthday === '' && errors.citizenID === '' && errors.phone === '');  
    }

    useEffect(() => {
        validInfomation();
    }, [name, birthday, employeeId, citizenID, phone, address])

    const handleSubmit = async(e : any) => {
        if (isValid) {
            await axios.request({
                method: 'POST',
                url: 'http://localhost:8080/api/user/updateinfo',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                timeout: 5000,
                responseType: 'json',
                data: {
                    id: myProfileData !== null ? myProfileData.id : '',
                    name: name,
                    employeeId: employeeId,
                    birthday: birthday,
                    phone: phone,
                    citizenID: citizenID,
                    address: address
                }
            }).then((res) => {
                if (res.status === 200) {
                    localStorage.removeItem('myProfile');
                    return router.push('/profile');
                }
                
            }).catch((e) => {
                console.log(e);
            })
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log(errors);
        console.log(myProfileData.id);
        setIsSubmit(true);
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton><Modal.Title>Unsave change</Modal.Title></Modal.Header>
                <Modal.Body>Your change will not be saved</Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setShow(false)} className="btn m-1">
                            Close
                        </Button>
                        <Button onClick={() => router.push('/profile')} className="btn m-1">OK</Button>
                    </div>
                </Modal.Footer> 
            </Modal>
            <Container className="">
                <Container className="col-sm-4 m-0" fluid>
                    <Image src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" className="w-50" roundedCircle/>
                    <Button className="btn">Change Avatar</Button>
                </Container>
                <Container as={Row} className="mt-3">
                    <Col >
                        <Row>
                            <p className="col-sm-4">Name: </p>
                            <div className="col">
                                <Form.Control className="border border-dark" type="text" readOnly
                                    value={name} onChange={(e) => setName(e.target.value)} 
                                />
                            </div>
                            
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Birthday: </p>
                            <div className="col">
                                <Form.Control className={errors.birthday && isSubmit ? "border border-danger" : "border border-dark"} type="date" 
                                    value={moment(birthday).format('YYYY-MM-DD')} onChange={(e : any) => setBirthday(e.target.value)}
                                />
                                {errors.birthday && isSubmit ? <p className='error-message'>{errors.birthday}</p> : <br/>}
                            </div>
                        </Row>
                        
                        <Row>
                            <p className="col-sm-4">Employee Id: </p>
                            <div className="col">
                                <Form.Control className="border border-dark" type="text" readOnly
                                    value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}
                                />
                            </div>
                            
                        </Row><br/>
                        
                    </Col>
                    <Col md={2}>
                    </Col>
                    <Col>
                        <Row>
                            <p className="col-sm-4">Citizen Id: </p>
                            <div className="col">
                                <Form.Control className={errors.citizenID && isSubmit ? "border border-danger" : "border border-dark"} type="text" 
                                    value={citizenID} onChange={(e) => setCitizenID(e.target.value)}
                                />
                                {errors.citizenID && isSubmit ? <p className='error-message'>{errors.citizenID}</p> : <br/>}
                            </div>
                        </Row>
                        <Row>
                            <p className="col-sm-4">Phone: </p>
                            <div className="col">
                                <Form.Control className={errors.phone && isSubmit ? "border border-danger" : "border border-dark"} type="text"
                                    value={phone} onChange={(e) => setPhone(e.target.value)}
                                />
                                {errors.phone && isSubmit ? <p className='error-message'>{errors.phone}</p> : <br/>}
                            </div>
                        </Row>
                        <Row>
                            <p className="col-sm-4">Address: </p>
                            <div className="col">
                                <Form.Control className="border border-dark" type="text"
                                    value={address} onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </Row><br/>
                    </Col>
                </Container>
                <Container fluid className="d-flex justify-content-center mt-3">
                    <Button type="button" className="btn m-2" onClick={(e) => handleSubmit(e)}>Save</Button>
                    <Button type="button" className="btn m-2" onClick={() => setShow(true)}>Cancel</Button>
                </Container>
            </Container>
        </>
    )
}