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

import {
    fetchingProducts,
    retrievedProductFailed,
    retrievedProduct
} from '../../redux/product.slice'

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
        fetch(dispatch, retrievedCategory, retrievedCategoryFailed, '/category/sub')
    }, [dispatch])

    const { categories } = useSelector((state: RootState) => state.category);

    const categorySection = categories.slice(0, 8)

    useEffect(() => {
        dispatch(fetchingProducts());
        fetch(dispatch, retrievedProduct, retrievedProductFailed, '/product')
    }, [dispatch])

    const { products } = useSelector((state: RootState) => state.product);

    const productSection = products.slice(0, 6)

    return (<>
        {isLoading ? (<h1>Loading ...</h1>) : (

            <div className='m-2'>
                < Navbar />

                {/* category option bar */}
                <div className='
                sr-only
                md:not-sr-only
                flex justify-center
                bg-gray-200 my-2'>
                    <ul className='flex md:space-x-1 lg:space-x-2 xl:space-x-4 2xl:space-x-6'>

                        {subCategoryBar.map((v) => (<li className='md:text-xs lg:text-sm xl:text-base'>{v.name}</li>))}

                        <p className='md:text-xs lg:text-sm xl:text-base'>see all</p>
                    </ul>
                </div>

                {/* first section */}
                <div className='flex flex-row h-60 mt-2'>
                    <div className='
                    sr-only md:not-sr-only
                    md:w-1/5 md:h-full'>
                        <div className='flex flex-row justify-center'>
                            <FaTools className="
                            md:h-3 md:w-3
                            lg:h-4 lg:w-4
                            mr-1 mt-1" aria-hidden="true" />
                            <p className='font-bold
                            md:text-sm
                            lg:text-base'>
                                Buy your products</p>
                        </div>
                        <ul className='ml-2
                        md:w-full md:h-52 md:overflow-y-scroll'>
                            {categories.map((v) => (<li>{v.name}</li>))}
                        </ul>
                    </div>
                    <div className='w-full md:w-4/5 bg-yellow-300 flex flex-row h-full'>
                        <div className='w-3/6'>image section</div>
                        <div className='w-3/6'>text section</div>
                    </div>
                </div>

                {/* section 2 */}
                <div className='my-3
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-4
                gap-3'>
                    {categorySection.map((c) => (
                        <div className='relative'>
                            <p className='absolute ml-2'>{c.name}</p>
                            <img className='
                            h-36
                            2xl:h-52
                            w-full
                            bg-gray-400' src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-mark-mccammon-1080721.jpg" alt="" />
                            <ul className='self-center'>
                                {
                                    c.SubCategories.map((s) => (
                                        <li>{s.name}</li>
                                    ))
                                }
                                <p>see all</p>
                            </ul>
                        </div>
                    ))}
                </div>

                {/* recent updates */}

                <div className='my-2'>
                    <span>Recent Updates</span>
                    <div className='
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-6
                    gap-3
                    '>
                        {productSection.map((p) => (
                            <div className='mt-2'>
                                <img className='bg-gray-200
                                w-full
                                h-32
                                2xl:h-52' src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-mark-mccammon-1080721.jpg" alt="" />
                                <p>{p.name}</p>
                                <p>{p.brand}</p>
                                <p>Ratings</p>
                                <p>{p.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        )}
    </>)
}

