
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const RegisterScreen = () => {

    const [name , setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const redirect = searchParams.get("redirect") ? searchParams.get("redirect") : '/'

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }   
    }, [navigate, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password));
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{ error }</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='emailId' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-3'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                Have an Account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Login
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
