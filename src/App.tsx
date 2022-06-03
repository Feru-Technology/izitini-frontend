import { fetch } from './api/apiAction'
import { useDispatch } from 'react-redux'
import User from './components/admin/user'
import Shop from './components/admin/shop'
import Shops from './components/admin/shops'
import Users from './components/admin/users'
import Cart from './components/customer/Cart'
import Store from './components/vendor/Store'
import Home from './components/customer/home'
import Order from './components/customer/order'
import Orders from './components/vendor/Orders'
import Reports from './components/admin/reports'
import ShopOrder from './components/vendor/order'
import Coupons from './components/vendor/Coupons'
import AllOrders from './components/admin/Orders'
import Products from './components/admin/products'
import MyOrders from './components/customer/orders'
import Product from './components/customer/product'
import MyReports from './components/vendor/Reports'
import Profile from './components/customer/profile'
import SingleOrders from './components/admin/order'
import Settings from './components/customer/settings'
import AdminProduct from './components/admin/product'
import MyProducts from './components/vendor/Products'
import Category from './components/customer/category'
import Categories from './components/admin/categories'
import AdminSettings from './components/admin/Settings'
import VendorProduct from './components/vendor/product'
import AdminDashboard from './components/admin/Dashboard'
import NotFound from './components/customer/NotFoundPage'
import CreateStore from './components/vendor/CreateStore'
import ShopProducts from './components/admin/shopProducts'
import CreateVendor from './components/admin/createVendor'
import CreateCustomer from './components/admin/createUser'
import VendorDashboard from './components/vendor/Dashboard'
import Subcategory from './components/customer/subcategory'
import AllProducts from './components/customer/allProducts'
import SubCategories from './components/admin/subCategories'
import AdminCreateStore from './components/admin/CreateStore'
import SubCatProducts from './components/admin/subCatProducts'
import CustomerDashboard from './components/customer/Dashboard'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import CatSubCategories from './components/admin/catSubCategories'
import SignInPage from './components/customer/accounts/SignInPage'
import AccountTypes from './components/customer/accounts/accountTypes'
import VendorSignUp from './components/customer/accounts/VendorSignUp'
import CustomerSignUp from './components/customer/accounts/CustomerSignUp'

import { loggedIn, login, reLoginFailed } from './redux/profile.slice'


const App = () => {

    // redux
    const dispatch = useDispatch()

    const token = localStorage.getItem('token')

    const profile = () => {
        dispatch(login())
        fetch(dispatch, loggedIn, reLoginFailed, '/users/my/profile', token)
    }

    if (token) profile()


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/signin' element={<SignInPage />} />
                <Route path='/products' element={<AllProducts />} />
                <Route path='/signup' element={<CustomerSignUp />} />
                <Route path='/products/p/:id' element={<Product />} />
                <Route path='/account-types' element={<AccountTypes />} />
                <Route path='/vendor-signup' element={<VendorSignUp />} />
                <Route path='/products/s/:id' element={<Subcategory />} />
                <Route path='/products/c/:categoryName' element={<Category />} />
                <Route path='/user'>
                    <Route index element={<CustomerDashboard />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='orders' element={<MyOrders />} />
                    <Route path='orders/:id' element={<Order />} />
                    <Route path='settings' element={<Settings />} />
                </Route>

                <Route path='/vendor' >
                    <Route index element={<VendorDashboard />} />
                    <Route path='stores' element={<Store />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='coupons' element={<Coupons />} />
                    <Route path='reports' element={<MyReports />} />
                    <Route path='products' element={<MyProducts />} />
                    <Route path='orders/:id' element={<ShopOrder />} />
                    <Route path='create-store' element={<CreateStore />} />
                    <Route path='products/:id' element={<VendorProduct />} />
                </Route>

                <Route path='/profession' element={<h1>Professional page coming soon</h1>} />

                <Route path='/admin' >
                    <Route index element={<AdminDashboard />} />
                    <Route path='users' element={<Users />} />
                    <Route path='shops' element={<Shops />} />
                    <Route path='users/:id' element={<User />} />
                    <Route path='shops/:id' element={<Shop />} />
                    <Route path='reports' element={<Reports />} />
                    <Route path='orders' element={<AllOrders />} />
                    <Route path='products' element={<Products />} />
                    <Route path='categories' element={<Categories />} />
                    <Route path='settings' element={<AdminSettings />} />
                    <Route path='orders/:id' element={<SingleOrders />} />
                    <Route path='products/:id' element={<AdminProduct />} />
                    <Route path='subCategories' element={<SubCategories />} />
                    <Route path='shops/create' element={<AdminCreateStore />} />
                    <Route path='products/shop/:id' element={<ShopProducts />} />
                    <Route path='categories/:id' element={<CatSubCategories />} />
                    <Route path='users/create-vendor' element={<CreateVendor />} />
                    <Route path='subCategories/p/:id' element={<SubCatProducts />} />
                    <Route path='users/create-customer' element={<CreateCustomer />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>

        </BrowserRouter>

    )
}

export default App
