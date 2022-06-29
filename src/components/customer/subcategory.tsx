import { Footer } from './footer'
import { Navbar } from './navbar'
import { useSelector } from 'react-redux'
import { CategoryBar } from './categoryBar'
import { RootState } from '../../redux/store'
import { Link, useParams } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { useSubCategoriesInCat } from '../../api/subCategories'
import shorten from '../../utils/common/shotenString'

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
                            <Link to={'/products'} className='hover:underline hover:text-[#004896]'>All Products</Link>
                            <ChevronRightIcon className='h-4 md:h-5 mx-1 text-slate-500' />
                            <Link to={`/products/c/${Products[0]?.subCategory.category.name}`}
                                className='hover:underline hover:text-[#004896]'>
                                {Products[0]?.subCategory.category.name}</Link>
                            <ChevronRightIcon className='h-4 md:h-5 mx-1 text-slate-500' />
                            <p className='text-slate-500 font-normal'> {Products[0]?.subCategory.name}</p>
                        </div>

                        {/* categories */}
                        <div className='my-4 lg:my-8 font-medium
                        grid grid-cols-2 lg:grid-cols-3 xl:gap-4 gap-3'>
                            {Products?.map((p) => (
                                <div className='mt-2 w-full group' key={p.product.id}>
                                    <Link to={`/products/p/${p.product.id}`} className='w-full'>
                                        <img className='w-ful max-h-32 2xl:max-h-52 mx-auto'
                                            src={p.product.display_image || 'https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png'} alt='' />

                                        <button className='text-black bg-slate-100 group-hover:bg-slate-300 w-full rounded my-2'>More</button>
                                        <p className='text-slate-800 text-md group-hover:text-[#004896]'>{shorten(p.product.name, 55)}</p>
                                        <p className='font-normal text-xs text-slate-500'>by {p.product.brand}</p>
                                        <p className='font-semibold mt-2'>RWF {p.product.price}</p>

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
