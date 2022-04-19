import { fetch } from './api/apiAction'
import { useDispatch } from 'react-redux'
import User from './components/admin/user'
import Shop from './components/admin/shop'
import Shops from './components/admin/shops'
import Users from './components/admin/users'
import Cart from './components/customer/Cart'
import Store from './components/vendor/Store'
import Home from './components/customer/home'
import Orders from './components/vendor/Orders'
import Reports from './components/admin/reports'
import Coupons from './components/vendor/Coupons'
import Products from './components/admin/products'
import MyOrders from './components/customer/orders'
import Settings from './components/vendor/Settings'
import Product from './components/customer/product'
import MyReports from './components/vendor/Reports'
import AdminProduct from './components/admin/product'
import MyProducts from './components/vendor/Products'
import Category from './components/customer/category'
import Categories from './components/admin/categories'
import AdminSettings from './components/admin/Settings'
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
import CreateProduct from './components/vendor/CreateProduct'
import SubCatProducts from './components/admin/subCatProducts'
import CustomerDashboard from './components/customer/Dashboard'
import CatSubCategories from './components/admin/catSubCategories'
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
                <Route path='/vendor/reports' element={<MyReports />} />
                <Route path='/vendor/coupons' element={<Coupons />} />
                <Route path='/vendor/settings' element={<Settings />} />
                <Route path='/vendor/products' element={<MyProducts />} />
                <Route path='/vendor/create-store' element={<CreateStore />} />
                <Route path='/vendor/create-product' element={<CreateProduct />} />

                <Route path='/profession' element={<h1>Professional page coming soon</h1>} />

                <Route path='/admin' element={<AdminDashboard />} />
                <Route path='/admin/users' element={<Users />} />
                <Route path='/admin/shops' element={<Shops />} />
                <Route path='/admin/users/:id' element={<User />} />
                <Route path='/admin/shops/:id' element={<Shop />} />
                <Route path='/admin/reports' element={<Reports />} />
                <Route path='/admin/products' element={<Products />} />
                <Route path='/admin/categories' element={<Categories />} />
                <Route path='/admin/settings' element={<AdminSettings />} />
                <Route path='/admin/products/:id' element={<AdminProduct />} />
                <Route path='/admin/subCategories' element={<SubCategories />} />
                <Route path='admin/products/shop/:id' element={<ShopProducts />} />
                <Route path='/admin/shops/create' element={<AdminCreateStore />} />
                <Route path='/admin/categories/:id' element={<CatSubCategories />} />
                <Route path='/admin/users/create-vendor' element={<CreateVendor />} />
                <Route path='/admin/subCategories/p/:id' element={<SubCatProducts />} />
                <Route path='/admin/users/create-customer' element={<CreateCustomer />} />

                <Route path='*' element={<NotFound />} />
            </Routes>

        </BrowserRouter>

    )
}

export default App
