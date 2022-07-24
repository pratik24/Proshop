import { useEffect } from "react"
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { addToCart, removeFromCart } from "../actions/cartActions"
import Message from "../components/Message"

const CartScreen = () => {
    console.log("cart screen start")
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const productId = params.id
    const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 0
    
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    
    console.log('cartitems from screen is ', cartItems)
    
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        } else {
            console.log('nothing to dispatch')
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping cart</h1>
                { cartItems.length === 0 ? 
                    ( <Message>Your cart is empty <Link to='/'>Go Back</Link> </Message> ) : 
                    (
                        <ListGroup variant='flush'>
                            {cartItems.map( item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control as='select' value={item.qty} 
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                ))
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item) => acc= acc+item.qty, 0)}) items
                            </h2>
                            $
                            {cartItems.reduce((acc, item) => acc = acc + (item.qty*item.price), 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button type='button' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                    PROCEED TO CHECKOUT
                                </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
