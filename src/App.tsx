import { fetch } from './api/apiAction'
import { useDispatch } from 'react-redux'
import { Home } from './components/main/home'
import Store from './components/vendor/Store'
import Product from './components/main/product'
import Orders from './components/vendor/Orders'
import Reports from './components/vendor/Reports'
import Coupons from './components/vendor/Coupons'
import Products from './components/vendor/Products'
import Settings from './components/vendor/Settings'
import Dashboard from './components/vendor/Dashboard'
import CreateStore from './components/vendor/CreateStore'
import CreateProduct from './components/vendor/CreateProduct'
import SignInPage from './components/main/accounts/SignInPage'
import { loggedIn, login, loginFailed } from './redux/profile.slice'
import CustomerSignUp from './components/main/accounts/CustomerSignUp'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

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
                {/* <Route path='/products' element={<products />} /> */}
                <Route path='/product' element={<Product />} />
                <Route path='/signup' element={<CustomerSignUp />} />
                <Route path='/signin' element={<SignInPage />} />

            </Routes>

            <div>

            </div>
            {token ?
                (<Routes>
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
                    <Route path='/vendor/store/:id' element={<Products />} />
                    <Route path='/vendor/products' element={<Products />} />
                    <Route path='/vendor/orders' element={<Orders />} />
                    <Route path='/vendor/coupons' element={<Coupons />} />
                    <Route path='/vendor/reports' element={<Reports />} />
                    <Route path='/vendor/settings' element={<Settings />} />

                    <Route path='/profession' element={<h1>Professional page coming soon</h1>} />
                </Routes>)

                : (<Navigate to='/signin' />)
            }

        </BrowserRouter>
    )
}

export default App
