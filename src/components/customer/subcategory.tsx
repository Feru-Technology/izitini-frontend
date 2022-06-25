import { Footer } from './footer'
import { Navbar } from './navbar'
import { useSelector } from 'react-redux'
import { CategoryBar } from './categoryBar'
import { RootState } from '../../redux/store'
import { Link, useParams } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { useSubCategoriesInCat } from '../../api/subCategories'

const Subcategory = () => {

    // Get ID from URL
    const params = useParams()
    const { id } = params

    useSubCategoriesInCat(id)
    const { isLoading, Products } = useSelector((state: RootState) => state.subCategoryProducts)

    return (<>
        {isLoading ? (<h1>Loading ...</h1>) : (

            <div className='font-nova'>
                < Navbar />
                < CategoryBar
                />
                {isLoading ? (<h1 className='h-140 md:h-160 lg:h-129'>Loading...</h1>) : Products.length !== 0 ? (
                    <div className='mx-5 md:mx-10 lg:mx-12 xl:mx-24'>

                        {/* navigation */}
                        <div className='flex mt-4 lg:mt-8 font-semibold text-xs md:text-sm'>
                            <Link to={'/products'}>All Products</Link>
                            <ChevronRightIcon className='h-4 md:h-5 mx-1 text-slate-500' />
                            <Link to={`/products/c/${Products[0]?.subCategory.category.name}`}>
                                {Products[0]?.subCategory.category.name}</Link>
                            <ChevronRightIcon className='h-4 md:h-5 mx-1 text-slate-500' />
                            <p className='text-slate-500 font-normal'> {Products[0]?.subCategory.name}</p>
                        </div>

                        {/* categories */}
                        <div className='md:mt-4 lg:mt-8 font-medium
                        grid grid-cols-2 lg:grid-cols-3 xl:gap-4 gap-3'>
                            {Products?.map((prod) => (
                                <div className='my-2' key={prod.product.id}>
                                    <Link to={`/products/p/${prod.product.id}`}>
                                        <img className='h-36  2xl:h-52 w-full bg-slate-200
                                            lg:h-40 xl:h-48'
                                            src={prod.product.display_image || 'https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png'} alt='' />
                                        <div className='mt-5'>
                                            <p className='text-base md:text-lg lg:text-xl'>{prod.product.name}</p>
                                            <p className='text-xs md:text-sm text-slate-400'>{prod.product.brand}</p>
                                            <p className='text-sm md:text-lg lg:text-xl'>{prod.product.price}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                ) : (<div className='flex flex-col items-center justify-center font-semibold h-140 md:h-160 lg:h-129'
                >No Product yet</div>)}

                <Footer />
            </div>
        )}
    </>)
}

export default Subcategory
