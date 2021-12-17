import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/vendor/Header'
import SiderBar from './components/vendor/SiderBar'
import Dashboard from './components/vendor/Dashboard'
import Orders from './components/vendor/Orders'
import Products from './components/vendor/Products'
import Reports from './components/vendor/Reports'
import Settings from './components/vendor/Settings'
import Store from './components/vendor/Store'
import Coupons from './components/vendor/Coupons'
import { useMediaQuery } from 'react-responsive'
import CreateProduct from './components/vendor/CreateProduct'
import SignInPage from './components/main/accounts/SignInPage'
import CustomerSignUp from './components/main/accounts/CustomerSignUp'
import { Transition } from '@headlessui/react'

function Vendor() {
    const [isClosed, setIsClosed] = useState(false)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    return (
        <div className='flex h-screen overflow-hidden'>
            {/* Sidebr  */}
            <SiderBar
                isClosed={isClosed}
                setIsClosed={setIsClosed}
                isStatic={isStatic}
            />
            {/* Header  */}
            <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                <Header
                    isClosed={isClosed}
                    setIsClosed={setIsClosed}
                    isStatic={isStatic}
                />
                <Transition
                    appear={true}
                    show={!isStatic && !isClosed}
                    enter='transition-opacity duration-200'
                    enterFrom='opacity-0'
                    enterTo='opacity-50'
                    leave='transition-opacity duration-200'
                    leaveFrom='opacity-50'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black opacity-60 z-10' />
                </Transition>

                <Routes>
                    <Route path='/signup' element={<CustomerSignUp />} />
                    <Route path='/signin' element={<SignInPage />} />
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/stores' element={<Store />} />
                    <Route path='/Profession' element={<Products />} />
                    <Route
                        path='/products/create-product'
                        element={<CreateProduct />}
                    />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/coupons' element={<Coupons />} />
                    <Route path='/reports' element={<Reports />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </div>
        </div>
    )
}

export default Vendor
