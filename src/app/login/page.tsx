'use client';

import { useState, useEffect } from 'react';
import React from "react";
import './page.css';
import { Container, Button, Form, Image } from 'react-bootstrap';
import Loading from '../(dashboard)/Components/loading/Loading';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email: '', password: ''}); 
    const [isFormValid, setIsFormValid] = useState(false);
    const [already, setAlready] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isError, setIsError] = useState(false);

    const router = useRouter();

    useEffect(() => {
        validateForm();
    }, [email, password]);

    // Validate form
    const validateForm = () => {
        let errors = {
            email: '',
            password: ''
        };

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(email) && email) {
            errors.email = 'Email is invalid';
        }

        if(!password) {
            errors.password = 'Password is required';
        } else if (password.length < 8) {
            errors.password = 'Password is invalid';
        }

        setErrors(errors);
        setIsFormValid(errors.email === '' && errors.password === '');
    }

    // Submit form
    const handleSubmit = (e : any) => {
        if (isFormValid) {
            setAlready(false);
            axios.request({
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: `http://localhost:8080/api/user/login`,
                timeout: 5000,
                responseType: 'json',
                data: {
                    email: email,
                    password: password,
                }
            }).then((response) => {
                if (response.status === 200 && response.data.user.email === email) {
                    setIsError(false);
                    localStorage.setItem('userId', response.data.user.id);
                    localStorage.setItem('userName', response.data.user.name);
                    localStorage.setItem('userRoleId', response.data.user.role_id);
                    localStorage.setItem('userDepartmentId', response.data.user.department_id);
                    localStorage.setItem('employeeId', response.data.user.employee_id);
                    localStorage.setItem('userEmail', response.data.user.email);
                    localStorage.setItem('userAvatar', response.data.user.avatar);
                    console.log(response);
                    return router.push('/');
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            setIsError(true);
            e.preventDefault();
            e.stopPropagation();
        }
        setIsSubmit(true);
        console.log(isFormValid);
        console.log(errors);
        console.log(email, password);
    }

    useEffect(() => {
        if (!already) {
            setAlready(true);
        }
    }, [already]);

    return (
        <>
        { already == false ? <Loading></Loading> : 
            <Container className='d-flex justify-content-center bg-info' fluid>
                <Container fluid className='col-8'>
                    <Image src='https://zotek8.com/wp-content/uploads/2023/06/smartTab-1024x805.png' className='bg-info img-fluid'/>
                </Container>
            
                <Container className='d-flex align-items-center col vh-100' fluid>
                    <Container className='bg-white border border-black' fluid>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group className='mt-3 justify-content-center d-flex'>
                                <Image width='100px' height='100px' src='https://zotek8.com/wp-content/uploads/2023/07/Zotek8_logo_no-slogan_1-1024x1024.png'/>
                            </Form.Group>

                            <Form.Group className='mt-3'>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control required placeholder='Enter your email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && isSubmit && <p className='error-message'>{errors.email}</p>}
                            </Form.Group>

                            <Form.Group className='mt-3'>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control required type='password' placeholder='Enter password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && isSubmit && <p className='error-message'>{errors.password}</p>}
                                {isError && <p className='error-message'>Your email or password was incorrect</p>}
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
                                <Button type='submit' onClick={(e) => handleSubmit(e)}>Login</Button>
                            </div>
                        </Form>
                    </Container>
                </Container>
            </Container>
        }
        </>
    )
}

export default login;