import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { loginUser } from "../actions/userActions"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import Message from "../components/Message"


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [searchParams, setSearchParams] = useSearchParams()
    const redirect = searchParams.get("redirect") ? searchParams.get("redirect") : '/'

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin  = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(loginUser(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            { error && <Message variant='danger'>{error}</Message>}
            { loading && <Loader />}
            <Form onSubmit={submitHandler}>
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

                <Button type='submit' variant='primary' className='my-3'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={ redirect ? `/register?${redirect}` : `/register` }>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen