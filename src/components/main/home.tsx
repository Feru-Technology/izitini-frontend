import React from 'react';
import { Navbar } from './navbar';

export const Home = () => {

    return (
        <div>
            < Navbar />

            {/* first section */}
            <div className='m-2 flex flex-row'>
                <div className='w-1/5 bg-red-400'>
                    <ul>
                        <span>
                            Buy your products
                        </span>
                        <li>
                            building materials
                        </li>
                        <li>
                            paint
                        </li>
                        <li>
                            bath
                        </li>
                        <li>
                            steel
                        </li>
                        <li>
                            wood
                        </li>
                        <li>
                            ceiling
                        </li>
                    </ul>
                </div>
                <div className='w-4/5 bg-yellow-300 flex flex-row'>
                    <div className='w-3/6'>image section</div>
                    <div className='w-3/6'>text section</div>
                </div>
            </div>
        </div>
    )
}
