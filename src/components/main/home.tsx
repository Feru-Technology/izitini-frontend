import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import { Footer } from './footer';
import { Navbar } from './navbar';
import { FaTools } from "react-icons/fa"
import { fetch } from '../../api/apiAction';

import {
    useSelector,
    useDispatch
} from 'react-redux'

import {
    fetchingSubCategories,
    retrievedSubCategoryFailed,
    retrievedSubCategory
} from '../../redux/subCategory.slice'

import {
    fetchingCategories,
    retrievedCategoryFailed,
    retrievedCategory
} from '../../redux/category.slice'

export const Home = () => {

    // redux
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchingSubCategories());
        fetch(dispatch, retrievedSubCategory, retrievedSubCategoryFailed, '/subCategory')
    }, [dispatch])


    const { isLoading, subCategories, error } = useSelector((state: RootState) => state.subCategory);

    const subCategoryBar = subCategories.slice(0, 10)

    useEffect(() => {
        dispatch(fetchingCategories());
        fetch(dispatch, retrievedCategory, retrievedCategoryFailed, '/category')
    }, [dispatch])

    const { categories } = useSelector((state: RootState) => state.category);

    const categorySection = categories.slice(0, 8)

    return (<>
        {isLoading ? (<h1>Loading</h1>) : (


            <div className='m-2'>
                < Navbar />

                {/* category option bar */}

                <div className='flex justify-center bg-gray-400 my-2'>
                    <ul className='flex space-x-2'>

                        {subCategoryBar.map((v) => (<li>{v.name}</li>))}
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
                            {categories.map((v) => (<li>{v.name}</li>))}
                        </ul>
                    </div>
                    <div className='w-4/5 bg-yellow-300 flex flex-row'>
                        <div className='w-3/6'>image section</div>
                        <div className='w-3/6'>text section</div>
                    </div>
                </div>

                {/* section 2 */}

                <div className='my-3 grid grid-cols-4 gap-3'>
                    {categorySection.map((v) => (<div className=''>
                        <p>{v.name}</p>
                        <img className='h-32 w-100 bg-gray-400' src={v.image_url} alt="" />
                        <ul className=''>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                            <li>see all</li>
                        </ul>
                    </div>
                    ))}
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
}

