import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './Main'
import Vendor from './Vendor'
import Profession from './Profession'

function App() {
    return (
        <div>
            <Routes>
                <Route path='/vendor' element={<Vendor />} />
                <Route path='/' element={<Main />} />
                <Route path='/profession' element={<Profession />} />
            </Routes>
        </div>
    )
}

export default App
