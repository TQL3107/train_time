'use client'

import { Container, Image, Col, Row, Button } from "react-bootstrap"
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import axios from "axios"

export default function profile() {
    const [userId, setUserId] = useState<string | null>('');
    const [userData, setUserData] = useState({
                                                name: '',
                                                birthday: '',
                                                employee_id: '',
                                                citizen_id: '',
                                                gender: '',
                                                phone: '',
                                                address: '',
                                                date_start_work: ''});

    const route = useRouter();

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
        
        if (userId) {
            console.log(userId);
            const getUserInfo = async() => {
                await axios.request({
                    method: 'GET',
                    url: 'http://localhost:8080/api/user/getinfo',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    timeout: 5000,
                    responseType: 'json',
                    params: {
                        id: userId
                    }
                }).then((res) => {
                    if (res.status === 200) {
                        const data = res.data.user;
                        if (data) {
                            setUserData(data);
                        }
                        console.log(res.data.user);
                    }
                    
                }).catch((error) => {
                    console.log(error);
                })
            }

            getUserInfo();
        }
    }, [userId]);

    const editProfile = () => {
        console.log('Edit Profile');
        console.log(userData);
        localStorage.setItem('myProfile', JSON.stringify(userData));
        route.push('/editprofile');
    }

    return (
        <>
            <Container>
                <Container className="col-sm-4 m-0" fluid>
                    <Image src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" className="w-50" roundedCircle/>
                    <Button className="btn" onClick={() => editProfile()}>Edit</Button>
                </Container>
                <Container as={Row} className="mt-3">
                    <Col >
                        <Row>
                            <p className="col-sm-4">Name: </p>
                            <p className="col">{userData.name}</p>
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Birthday: </p>
                            <p className="col">{userData.birthday}</p>
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Employee Id: </p>
                            <p className="col">{userData.employee_id}</p>
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Citizen Id: </p>
                            <p className="col">{userData.citizen_id}</p>
                        </Row><br/>
                    </Col>
                    <Col md={2}>
                    </Col>
                    <Col>
                        <Row>
                            <p className="col-sm-4">Gender: </p>
                            <p className="col">{userData.gender === '1' ? 'Female' : (userData.gender === '0' ? 'Male' : '')}</p>
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Phone: </p>
                            <p className="col">{userData.phone}</p>
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Address: </p>
                            <p className="col">{userData.address}</p>
                        </Row><br/>
                        <Row>
                            <p className="col-sm-4">Date start work: </p>
                            <p className="col">{userData.date_start_work}</p>
                        </Row><br/>
                    </Col>
                </Container>
                
            </Container>
        </>
    )
}