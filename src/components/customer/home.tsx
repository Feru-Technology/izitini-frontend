import { useEffect } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Link } from 'react-router-dom'
import { FaTools } from 'react-icons/fa'
import { CategoryBar } from './categoryBar'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

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

const Home = () => {

    // redux
    const dispatch = useDispatch()


    // const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchingCategories())
        fetch(dispatch, retrievedCategory, retrievedCategoryFailed, '/category/sub')
    }, [dispatch])

    const { isLoading, categories } = useSelector((state: RootState) => state.categories)

    const categorySection = categories.slice(0, 9)

    useEffect(() => {
        dispatch(fetchingProducts())
        fetch(dispatch, retrievedProducts, retrievedProductFailed, '/product')
    }, [dispatch])

    const { products } = useSelector((state: RootState) => state.allProducts)

    const productSection = products.slice(0, 5)

    return (<>
        {isLoading ? (<h1>Loading ...</h1>) : (

            <div className='font-sans'>
                < Navbar />
                < CategoryBar
                />
                <div className='mx-5 md:mx-10 lg:mx-12 xl:mx-24'>

                    {/* first section */}
                    <div className='flex flex-row h-60 mt-2'>
                        <div className='
                    sr-only md:not-sr-only
                    md:w-3/12 lg:w-1/5 md:h-full'>
                            <div className='flex flex-row justify-center text-dark-blue
                            border-b-2 border-dark-blue mr-3 ml-2'>
                                <FaTools className='
                            md:h-3 md:w-3
                            lg:h-4 lg:w-4
                            mr-1 mt-1' aria-hidden='true' />
                                <p className='font-bold
                            md:text-sm
                            lg:text-base'>
                                    Buy your products</p>
                            </div>
                            <ul className='ml-2
                        md:w-full md:h-52 md:overflow-y-scroll'>
                                {categories.map((cat) => (
                                    <Link to={`/products/c/${cat.name}`}>
                                        <li
                                            className='w-full text-lg text-gray-700
                                    hover:bg-dark-blue hover:text-white press-start
                                    md:px-3 lg:px-4'
                                        >{cat.name}</li>
                                    </Link>))}
                            </ul>

                        </div>
                        <div className='w-full md:w-9/12 lg:w-4/5 lg:ml-5 bg-gray-50 flex flex-row h-full'>
                            <Carousel
                                autoPlay={true}
                                interval={3000}
                                emulateTouch={true}
                                infiniteLoop={true}
                                showArrows={false}
                                showThumbs={false}
                                swipeable={true}
                                showStatus={false}
                            >
                                <div className='h-60'>
                                    <img alt='ads' src='https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg' />
                                </div>
                                <div className='h-60'>
                                    <img alt='ads' src='https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg' />
                                </div>
                                <div className='h-60'>
                                    <img alt='ads' src='https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg' />
                                </div>
                                <div className='h-60'>
                                    <img alt='ads' src='https://images.pexels.com/photos/4792488/pexels-photo-4792488.jpeg' />
                                </div>



                            </Carousel>
                        </div>
                    </div>

                    {/* categories */}
                    <div className='md:mt-4 lg:mt-8 font-medium
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                xl:gap-4
                gap-3'>
                        {categorySection.map((category) => (
                            <Link to={`/products/c/${category.name}`}>
                                <div className='relative my-2'>
                                    <p className='absolute ml-2'>{category.name}</p>
                                    <img className='h-36  2xl:h-52 w-full bg-gray-200
                                lg:h-40 xl:h-48'
                                        src='https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png' alt='' />
                                    <div className=''>
                                        <ul>
                                            {
                                                category.subCategories.map((subCat) => (
                                                    <li className='mt-1 font-light'>{subCat.name}</li>
                                                ))
                                            }
                                            <p className='text-dark-blue'>see all</p>
                                        </ul>

                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* recent updates */}
                    <div className='lg:mb-8 lg:mt-3 font-normal'>
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
                                    <Link to={`/products/${p.id}`}>
                                        <img className='bg-gray-200
                                w-full
                                h-32
                                2xl:h-52' src='https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png' alt='' />
                                        <p>{p.name}</p>
                                        <p>{p.brand}</p>
                                        <p>Ratings</p>
                                        <p>{p.price}</p>
                                    </Link>
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

export default Home
