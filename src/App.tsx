import { fetch, post } from './api/apiAction';
import { useDispatch } from 'react-redux'
import Home from './components/main/home'
import Cart from './components/main/Cart'
import Store from './components/vendor/Store'
import Product from './components/main/product'
import Orders from './components/vendor/Orders'
import Reports from './components/vendor/Reports'
import Coupons from './components/vendor/Coupons'
import NotFound from './components/main/NotFound'
import Category from './components/main/category'
import Products from './components/vendor/Products'
import Settings from './components/vendor/Settings'
import Dashboard from './components/vendor/Dashboard'
import Subcategory from './components/main/subcategory'
import AllProducts from './components/main/allProducts'
import CreateStore from './components/vendor/CreateStore'
import CreateProduct from './components/vendor/CreateProduct'
import SignInPage from './components/main/accounts/SignInPage'
import { loggedIn, login, loginFailed } from './redux/profile.slice'
import CustomerSignUp from './components/main/accounts/CustomerSignUp'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {

    // redux
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');

    const profile = () => {
        dispatch(login());
        fetch(dispatch, loggedIn, loginFailed, '/users/my/profile', token)
    }

    if (token) profile();

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/signin' element={<SignInPage />} />
                <Route path='/products/:id' element={<Product />} />
                <Route path='/products' element={<AllProducts />} />
                <Route path='/signup' element={<CustomerSignUp />} />
                <Route path='/products/c/:categoryName' element={<Category />} />
                <Route path='/products/s/:id' element={<Subcategory />} />

                <Route path='/vendor' element={<Dashboard />} />
                <Route path='/vendor/stores' element={<Store />} />
                <Route path='/vendor/orders' element={<Orders />} />
                <Route path='/vendor/reports' element={<Reports />} />
                <Route path='/vendor/coupons' element={<Coupons />} />
                <Route path='/vendor/settings' element={<Settings />} />
                <Route path='/vendor/store/:id' element={<Products />} />
                <Route path='/vendor/create-store' element={<CreateStore />} />
                <Route path='/vendor/create-product' element={<CreateProduct />} />

                <Route path='/profession' element={<h1>Professional page coming soon</h1>} />

                <Route path='*' element={<NotFound />} />
            </Routes>

        </BrowserRouter>
    )
}

export default App
