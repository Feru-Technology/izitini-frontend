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

    console.log('================================')
    //@ts-ignore
    console.log(Products);

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
                            <Link to={'/products'}>All Products</Link>
                            <span className='text-gray-500'> {currentCategory?.name}</span>
                        </p>
                    </div>

                    {/* categories */}
                    <div className='md:mt-4 lg:mt-8 font-medium
                grid grid-cols-1 md:grid-cols-2
                lg:grid-cols-3 xl:gap-4 gap-3'>
                        {Products?.map((prod) => (
                            <div className='relative my-2'>
                                <p className='absolute ml-2'>{prod.product.name}</p>
                                <img className='h-36  2xl:h-52 w-full bg-gray-200
                                lg:h-40 xl:h-48'
                                    src='https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png' alt='' />
                                <div className=''>

                                </div>
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
