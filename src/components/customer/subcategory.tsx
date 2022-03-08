import { useEffect } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { CategoryBar } from './categoryBar'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
    fetchingSubCategoryProducts,
    subCategoryProducts,
    subCategoryProductsFailed
} from '../../redux/subCategories/subCategoryProducts.slice'

const Subcategory = () => {

    // Get ID from URL
    const params = useParams()
    const { id } = params

    // redux
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchingSubCategoryProducts())
        fetch(dispatch, subCategoryProducts, subCategoryProductsFailed, `/subcategory/products/${id}`)
    }, [id, dispatch])

    const { currentCategory } = useSelector((state: RootState) => state.category)

    const { isLoading, Products } = useSelector((state: RootState) => state.subCategoryProducts)

    return (<>
        {isLoading ? (<h1>Loading ...</h1>) : (

            <div className='font-nova'>
                < Navbar />
                < CategoryBar
                />
                <div className='mx-5 md:mx-10 lg:mx-12 xl:mx-24'>

                    {/* navigation */}
                    <div className='flex mt-4'>
                        <p>
                            <Link to={'/products'}>All Products </Link>
                            <Link to={`/products/c/${currentCategory?.name}`}>{currentCategory?.name}</Link>
                            <span className='text-gray-500'> {Products[0]?.subCategory_id}</span>
                        </p>
                    </div>

                    {/* categories */}
                    <div className='md:mt-4 lg:mt-8 font-medium
                grid grid-cols-2
                lg:grid-cols-3 xl:gap-4 gap-3'>
                        {Products?.map((prod) => (
                            <div className='my-2'>
                                <Link to={`/products/${prod.product.id}`}>
                                    <img className='h-36  2xl:h-52 w-full bg-gray-200
                                lg:h-40 xl:h-48'
                                        src='https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png' alt='' />
                                    <div className='mt-5'>
                                        <p className='text-base md:text-lg lg:text-xl'>{prod.product.name}</p>
                                        <p className='text-xs md:text-sm text-gray-400'>{prod.product.brand}</p>
                                        <p className='text-sm md:text-lg lg:text-xl'>{prod.product.price}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>

                <Footer />
            </div>
        )}
    </>)
}

export default Subcategory
