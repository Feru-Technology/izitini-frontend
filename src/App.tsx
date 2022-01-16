import { useEffect } from 'react'
import { fetch, post } from './api/apiAction'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Home } from './components/main/home'
import Store from './components/vendor/Store'
import Orders from './components/vendor/Orders'
import Reports from './components/vendor/Reports'
import Coupons from './components/vendor/Coupons'
import Products from './components/vendor/Products'
import Settings from './components/vendor/Settings'
import Dashboard from './components/vendor/Dashboard'
import CreateStore from './components/vendor/CreateStore'
import CreateProduct from './components/vendor/CreateProduct'
import SignInPage from './components/main/accounts/SignInPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import CustomerSignUp from './components/main/accounts/CustomerSignUp'
import { loggedIn, login, loginFailed } from './redux/profile.slice'

function App() {

    // redux
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');

    const profile = () => {
        dispatch(login());
        fetch(dispatch, loggedIn, loginFailed, '/users/my/profile', token)
    }

    if (token) profile();
    console.log(token);

    console.log(loggedIn);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}>
                    <Route path='/products' element={<h1>This is all products page</h1>} />
                    <Route path='/product' element={<h1>This is product page</h1>} />
                </Route>
                <Route path='/signup' element={<CustomerSignUp />} />
                <Route path='/signin' element={<SignInPage />} />

            </Routes>

            <div>
                {/* {!token ? <Link to='/signin'></Link>
                    : */}

                <Routes>
                    <Route path='/vendor' element={<Dashboard />} />
                    <Route path='/vendor/stores' element={<Store />} />
                    <Route
                        path='/vendor/create-product'
                        element={<CreateProduct />}
                    />
                    <Route
                        path='/vendor/create-store'
                        element={<CreateStore />}
                    />
                    <Route path='/vendor/products' element={<Products />} />
                    <Route path='/vendor/orders' element={<Orders />} />
                    <Route path='/vendor/coupons' element={<Coupons />} />
                    <Route path='/vendor/reports' element={<Reports />} />
                    <Route path='/vendor/settings' element={<Settings />} />

                    <Route path='/profession' element={<h1>Professional page coming soon</h1>} />
                </Routes>

            </div>

        </BrowserRouter>
    )
}

export default App
