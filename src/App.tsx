import React, { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from './components/main/home'
import Dashboard from './components/vendor/Dashboard'
import Orders from './components/vendor/Orders'
import Products from './components/vendor/Products'
import Reports from './components/vendor/Reports'
import Settings from './components/vendor/Settings'
import Store from './components/vendor/Store'
import Coupons from './components/vendor/Coupons'
import CreateProduct from './components/vendor/CreateProduct'
import SignInPage from './components/main/accounts/SignInPage'
import CustomerSignUp from './components/main/accounts/CustomerSignUp'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}>
                    <Route path='/products' element={<h1>This is all products page</h1>} />
                    <Route path='/product' element={<h1>This is product page</h1>} />
                </Route>
                <Route path='/signup' element={<CustomerSignUp />} />
                <Route path='/signin' element={<SignInPage />} />

                <Route path='/vendor' element={<Dashboard />} />
                <Route path='/vendor/stores' element={<Store />} />
                <Route
                    path='/vendor/create-product'
                    element={<CreateProduct />}
                />
                <Route path='/vendor/products' element={<Products />} />
                <Route path='/vendor/orders' element={<Orders />} />
                <Route path='/vendor/coupons' element={<Coupons />} />
                <Route path='/vendor/reports' element={<Reports />} />
                <Route path='/vendor/settings' element={<Settings />} />

                <Route path='/profession' element={<h1>Professional page coming soon</h1>} />
                <Route path='/test' element={<h2>test</h2>}>
                    <Route path='test1' element={<h2>test1</h2>} />
                </Route>
            </Routes>

        </BrowserRouter>
    )
}

export default App
