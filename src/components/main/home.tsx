import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { store, RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux'
import Axios from '../../api/axios';
import { fetchingSubCategories, retrievedSubCategoryFailed, retrievedSubCategory } from '../../redux/subCategory.slice'
import { Navbar } from './navbar';
import { FaTools } from "react-icons/fa"
import { Footer } from './footer';
// import { subCategory } from '../../api/actions/subCategory';

export const Home = () => {

    // redux
    const dispatch = useDispatch();
    const { isLoading, data, error } = useSelector((state: RootState) => state.subCategory);

    useEffect(() => {
        dispatch(fetchingSubCategories());
        const fetchSubCategory = () => {
            Axios.get(`/category`)
                .then(({ data }) => {
                    console.log(data)
                    dispatch(retrievedSubCategory(data.data))
                })
                .catch(error => {
                    console.log(error);
                    dispatch(retrievedSubCategoryFailed(error))
                })
        }

        fetchSubCategory()
    }, [dispatch])

    return (<>
        {isLoading ? (<h1>Loading</h1>) : (
            // value.map((v) => (<>{v.name}</>))


            <div className='m-2'>
                < Navbar />

                {/* category option bar */}

                <div className='flex justify-center bg-gray-400 my-2'>
                    <ul className='flex space-x-2'>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                    </ul>
                </div>

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

                {/* recent updates */}
                {/* this have to be a slider */}

                <div className='my-2'>
                    <span>Recent Updates</span>
                    <div className='grid grid-cols-6'>
                        <div className='border-2 w-52'>
                            <img className='bg-gray-200 w-fit h-32' src="" alt="" />
                            <p>Building material</p>
                            <p>By simerw</p>
                            <p>Ratings</p>
                            <p>Price</p>
                        </div>
                        <div className='border-2 w-52'>
                            <img className='bg-gray-200 w-fit h-32' src="" alt="" />
                            <p>Building material</p>
                            <p>By simerw</p>
                            <p>Ratings</p>
                            <p>Price</p>
                        </div>
                        <div className='border-2 w-52'>
                            <img className='bg-gray-200 w-fit h-32' src="" alt="" />
                            <p>Building material</p>
                            <p>By simerw</p>
                            <p>Ratings</p>
                            <p>Price</p>
                        </div>
                        <div className='border-2 w-52'>
                            <img className='bg-gray-200 w-fit h-32' src="" alt="" />
                            <p>Building material</p>
                            <p>By simerw</p>
                            <p>Ratings</p>
                            <p>Price</p>
                        </div>
                        <div className='border-2 w-52'>
                            <img className='bg-gray-200 w-fit h-32' src="" alt="" />
                            <p>Building material</p>
                            <p>By simerw</p>
                            <p>Ratings</p>
                            <p>Price</p>
                        </div>
                        <div className='border-2 w-48'>
                            <img className='bg-gray-200 w-fit h-32' src="" alt="" />
                            <p>Building material</p>
                            <p>By simerw</p>
                            <p>Ratings</p>
                            <p>Price</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )}
    </>)
    // return (
    // )
}

