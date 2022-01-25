import { useEffect } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { FaTools } from "react-icons/fa"
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { CategoryBar } from './categoryBar'

import {
    useSelector,
    useDispatch
} from 'react-redux'

import {
    fetchingCategories,
    retrievedCategoryFailed,
    retrievedCategory
} from '../../redux/categories/categories.slice'

import {
    fetchingProducts,
    retrievedProductFailed,
    retrievedProducts
} from '../../redux/products/allProduct.slice'

export const Home = () => {

    // redux
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchingCategories());
        fetch(dispatch, retrievedCategory, retrievedCategoryFailed, '/category/sub')
    }, [dispatch])

    const { isLoading, categories } = useSelector((state: RootState) => state.category);

    const categorySection = categories.slice(0, 9)

    useEffect(() => {
        dispatch(fetchingProducts());
        fetch(dispatch, retrievedProducts, retrievedProductFailed, '/product')
    }, [dispatch])

    const { products } = useSelector((state: RootState) => state.allProducts);

    const productSection = products.slice(0, 5)

    return (<>
        {isLoading ? (<h1>Loading ...</h1>) : (

            <div className='my-2 font-sans'>
                < Navbar />
                < CategoryBar
                />

                <div className='lg:px-0 xl:mx-16'>

                    {/* first section */}
                    <div className='flex flex-row h-60 mt-2'>
                        <div className='
                    sr-only md:not-sr-only
                    md:w-1/5 md:h-full'>
                            <div className='flex flex-row justify-center text-dark-blue'>
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
                                {categories.map((v) => (
                                    <li
                                        className='w-full text-lg font-medium text-gray-700
                                    hover:bg-dark-blue hover:text-white
                                    lg:px-4'
                                    >{v.name}</li>))}
                            </ul>
                        </div>
                        <div className='w-full md:w-4/5 bg-yellow-300 flex flex-row h-full'>
                            <div className='w-3/6'>image section</div>
                            <div className='w-3/6'>text section</div>
                        </div>
                    </div>

                    {/* categories */}
                    <div className='my-3 font-medium
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-3'>
                        {categorySection.map((category) => (
                            <div className='relative'>
                                <p className='absolute ml-2'>{category.name}</p>
                                <img className='h-36  2xl:h-52 w-full bg-gray-200
                                lg:h-48'
                                    src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-mark-mccammon-1080721.jpg" alt="" />
                                <div className=''>
                                    <ul>
                                        {
                                            category.SubCategories.map((subCat) => (
                                                <li className='mt-1 font-normal'>{subCat.name}</li>
                                            ))
                                        }
                                        <p className='text-dark-blue'>see all</p>
                                    </ul>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* recent updates */}
                    <div className='my-2 font-normal'>
                        <span>Recent Updates</span>
                        <div className='
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-5
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
                </div>

                <Footer />
            </div>
        )}
    </>)
}

