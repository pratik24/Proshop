import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const { loading, user, error } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    console.log("user login is ", userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const navigate = useNavigate();

    useEffect(() => {
        console.log('calling the useffect ', userInfo, " user is ", user);
        if (!userInfo) {
            navigate('/login');
        } else {
            if(!user || !user.name || success){
                console.log("sending dispatch")
                dispatch(getUserDetails('profile'))
            } else {
                console.log("setting name ", user.name)
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, navigate, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                { message && <Message variant='danger'>{message}</Message> }
                {error && <Message variant='danger'>{ error }</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className='my-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
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
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
