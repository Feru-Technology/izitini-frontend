import React from 'react';
import { Navbar } from './navbar';
import { FaTools } from "react-icons/fa"

export const Home = () => {

    return (
        <div className='m-2'>
            < Navbar />

            {/* first section */}
            <div className='flex flex-row'>
                <div className='w-1/5 bg-red-400 h-60 overflow-y-scroll'>
                    <div className='flex flex-row justify-center'>
                        <FaTools className="h-4 w-4 mr-1 mt-1" aria-hidden="true" />
                        <p className='font-bold'>
                            Buy your products</p>
                    </div>
                    <ul className='ml-2'>
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

            {/* section 2 */}

            <div className='my-3 grid grid-cols-4 gap-3'>
                <div className=''>
                    <img className='h-32 w-100 bg-gray-400' src="" alt="" />
                    <ul className=''>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>see all</li>
                    </ul>
                </div>

                <div className=''>
                    <img className='h-32 w-100 bg-gray-400' src="" alt="" />
                    <ul className=''>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>see all</li>
                    </ul>
                </div>
                <div className=''>
                    <img className='h-32 w-100 bg-gray-400' src="" alt="" />
                    <ul className=''>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>see all</li>
                    </ul>
                </div>
                <div className=''>
                    <img className='h-32 w-100 bg-gray-400' src="" alt="" />
                    <ul className=''>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>see all</li>
                    </ul>
                </div>
                <div className=''>
                    <img className='h-32 w-100 bg-gray-400' src="" alt="" />
                    <ul className=''>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>see all</li>
                    </ul>
                </div>
                <div className=''>
                    <img className='h-32 w-100 bg-gray-400' src="" alt="" />
                    <ul className=''>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>see all</li>
                    </ul>
                </div>

                <div className=''>
                    <img className='h-32 w-100 bg-gray-400' src="" alt="" />
                    <ul className=''>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>see all</li>
                    </ul>
                </div>

                <div className=''>
                    <img className='h-32 w-100 bg-gray-400' src="" alt="" />
                    <ul className=''>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>see all</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
