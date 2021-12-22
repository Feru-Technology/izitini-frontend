import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './components/main/home'

function Profession() {


    return (
        <div>

            <Routes>
                <Route path='/' element={<h1>Professional page coming soon</h1>} />
                <Route path='/projects' element={<p>here we go</p>} />
            </Routes>
        </div>
    )
}

export default Profession
