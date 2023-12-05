'use client';

import { useState, useEffect } from 'react';
import { Container, Button, Form, Image } from 'react-bootstrap';
import axios from 'axios';
import { Route } from 'next';
import { useRouter } from 'next/navigation';

export default function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [already, setAlready] = useState(false);

    const router = useRouter();

    const onSubmit = async (e : any) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
        console.log(email, password);
    }

    const handleLogin = async (e : any) => {
        setAlready(false);
    }

    useEffect(() => {
        if (!already) {
            setAlready(true);
        }
    }, [already]);

    return (
        <>
        { already === false ? '' : 
            <Container className='d-flex justify-content-center bg-info' fluid>
                <Container fluid className='col-8'>
                    <Image src='https://zotek8.com/wp-content/uploads/2023/06/smartTab-1024x805.png' className='bg-info img-fluid'/>
                </Container>
            
                <Container className='d-flex align-items-center col vh-100' fluid>
                    <Container className='bg-white border border-black' fluid>
                        <Form noValidate validated={validated} onSubmit={onSubmit}>
                            <Form.Group className='mt-3'>
                                <Image></Image>
                            </Form.Group>

                            <Form.Group className='mt-3' controlId='formEmail'>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control required type='email' placeholder='Enter your email' 
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    Invalid email.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mt-3' controlId='formPassword'>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control required type='password' placeholder='Enter password' 
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    Invalid password.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Group className='mt-3'>
                                    <Form.Check type='checkbox' label='Remember me'/>
                                </Form.Group>
                                <Form.Group className='mt-3 d-flex justify-content-center'>
                                    <Form.Label>Đăng kí tài khoản <a href='/'>Sign Up</a></Form.Label>
                                </Form.Group>
                            </Form.Group>

                            <div className='m-3 d-flex justify-content-center'>
                                <Button type='submit' onClick={(e) => handleLogin(e)}>Login</Button>
                            </div>
                        </Form>
                    </Container>
                </Container>
            </Container>
        }
        </>
    )
}