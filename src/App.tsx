import { fetch } from './api/apiAction'
import { useDispatch } from 'react-redux'
import Home from './components/customer/home'
import Cart from './components/customer/Cart'
import Store from './components/vendor/Store'
import Orders from './components/vendor/Orders'
import Reports from './components/vendor/Reports'
import Coupons from './components/vendor/Coupons'
import Products from './components/vendor/Products'
import Settings from './components/vendor/Settings'
import Product from './components/customer/product'
import MyOrders from './components/customer/orders'
import NotFound from './components/customer/NotFound'
import Category from './components/customer/category'
import CreateStore from './components/vendor/CreateStore'
import VendorDashboard from './components/vendor/Dashboard'
import Subcategory from './components/customer/subcategory'
import AllProducts from './components/customer/allProducts'
import CreateProduct from './components/vendor/CreateProduct'
import CustomerDashboard from './components/customer/Dashboard'
import SignInPage from './components/customer/accounts/SignInPage'
import AccountTypes from './components/customer/accounts/accountTypes'
import VendorSignUp from './components/customer/accounts/VendorSignUp'
import CustomerSignUp from './components/customer/accounts/CustomerSignUp'

import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { loggedIn, login, loginFailed } from './redux/profile.slice'

function App() {

    // redux
    const dispatch = useDispatch()

    const token = localStorage.getItem('token')

    const profile = () => {
        dispatch(login())
        fetch(dispatch, loggedIn, loginFailed, '/users/my/profile', token)
    }

    if (token) profile()

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/signin' element={<SignInPage />} />
                <Route path='/products/p/:id' element={<Product />} />
                <Route path='/products' element={<AllProducts />} />
                <Route path='/signup' element={<CustomerSignUp />} />
                <Route path='/account-types' element={<AccountTypes />} />
                <Route path='/vendor-signup' element={<VendorSignUp />} />
                <Route path='/products/c/:categoryName' element={<Category />} />
                <Route path='/products/s/:id' element={<Subcategory />} />
                <Route path='/dashboard' element={<CustomerDashboard />} />
                <Route path='/orders' element={<MyOrders />} />

                <Route path='/vendor' element={<VendorDashboard />} />
                <Route path='/vendor/stores' element={<Store />} />
                <Route path='/vendor/orders' element={<Orders />} />
                <Route path='/vendor/reports' element={<Reports />} />
                <Route path='/vendor/coupons' element={<Coupons />} />
                <Route path='/vendor/settings' element={<Settings />} />
                <Route path='/vendor/products' element={<Products />} />
                <Route path='/vendor/create-store' element={<CreateStore />} />
                <Route path='/vendor/create-product' element={<CreateProduct />} />

                <Route path='/profession' element={<h1>Professional page coming soon</h1>} />

                <Route path='*' element={<NotFound />} />
            </Routes>

        </BrowserRouter>

    )
}

export default App
