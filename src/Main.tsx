import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './components/main/home'

function Main() {


    return (
        <div>

            <Routes>
                <Route path='/' element={< Home />} />
            </Routes>
        </div>
    )
}

export default Main
