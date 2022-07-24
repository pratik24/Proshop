import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { cartReducers } from './reducers/cartReducers'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { userDetailReducer, userLoginReduer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducers,
    userLogin: userLoginReduer,
    userRegister: userRegisterReducer,
    userDetails: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
})
const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: { cartItems: cartItemFromStorage},
    userLogin: { userInfo: userInfoFromStorage}, 
}
const middleware = [thunk]

const store = createStore(reducer, initialState, applyMiddleware(...middleware))
export default store