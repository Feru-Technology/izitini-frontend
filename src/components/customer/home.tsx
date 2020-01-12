import { Footer } from './footer'
import { Navbar } from './navbar'
import { useAds } from '../../api/ad'
import { Link } from 'react-router-dom'
import { FaTools } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { CategoryBar } from './categoryBar'
import { RootState } from '../../redux/store'
import { useProducts } from '../../api/products'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

const Home = () => {

    const { categories } = useSelector((state: RootState) => state.categories)
    const categorySection = categories.slice(0, 9)

    useAds()
    const { ads } = useSelector((state: RootState) => state.ad)

    useProducts()
    const { isLoading, products } = useSelector((state: RootState) => state.allProducts)

    return (<>
        {isLoading ? (<h1>Loading ...</h1>) : (

            <div className='font-sans'>
                < Navbar />
                < CategoryBar
                />
                <div className='mx-5 md:mx-10 lg:mx-12 xl:mx-24'>

                    {/* first section */}
                    <div className='flex flex-row h-60 md:h-72 mt-2'>
                        <div className='sr-only md:not-sr-only md:w-3/12 lg:w-1/5 md:h-full'>
                            <div className='flex flex-row justify-center text-[#004896]
                            border-b-2 border-[#004896] mr-3 ml-2'>
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
                                    <Link to={`/products/c/${cat.name}`} key={cat.id}>
                                        <li
                                            className='w-full text-lg text-slate-700
                                    hover:bg-[#004896] hover:text-white press-start
                                    md:px-3 lg:px-4'
                                        >{cat.name}</li>
                                    </Link>
                                ))}
                            </ul>

                        </div>
                        <div className='w-full md:w-9/12 lg:w-4/5 lg:ml-5 bg-slate-50 flex flex-row h-full'>
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
                                {ads.map((ad) => (
                                    <div className='h-60 md:h-72' key={ad.id}>
                                        <img alt='ads' src={ad.big_screen_image} />
                                    </div>))}

                            </Carousel>
                        </div>
                    </div>

                    {/* categories */}
                    <div className='md:mt-4 lg:mt-8 font-medium grid grid-cols-1
                    md:grid-cols-2 lg:grid-cols-3 xl:gap-4 gap-3'>
                        {categorySection.map((category) => {
                            const subCategories = category.subCategories.slice(0, 4)
                            return (
                                <Link to={`/products/c/${category.name}`} key={category.id}>
                                    <div className='relative my-2 group'>
                                        <div className='hover:underline'>
                                            <p className='absolute px-2 ml-2 group-hover:underline group-hover:bg-white/40 rounded'>{category.name}</p>
                                            <img className='h-40  2xl:h-52 w-full bg-slate-200 lg:h-44 xl:h-52 hover:shadow-sm'
                                                src={category.image_url || 'https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png'} alt='' />
                                        </div>

                                        {subCategories.length ?
                                            <ul>
                                                {
                                                    subCategories.map((subCat) => (
                                                        <li key={subCat.id}
                                                            className='font-light hover:underline hover:text-[#004896]'>{subCat.name}</li>
                                                    ))
                                                }
                                                <p className='text-[#004896] hover:underline'>see all</p>
                                            </ul> : ''}

                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                    {/* recent updates */}
                    <div className='lg:mb-8 lg:mt-3 font-normal'>
                        <span>Recent Updates</span>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
                            {products.map((p) => (
                                <div className='mt-2 w-full group' key={p.id}>
                                    <Link to={`/products/p/${p.id}`} className='w-full'>
                                        <img className='w-ful max-h-32 2xl:max-h-52'
                                            src={p.display_image || 'https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png'} alt='' />

                                        <button className='text-black bg-slate-100 hover:bg-slate-300 w-full rounded my-2'>More</button>
                                        <p className='font-mono font-medium tracking-tighter text-md lg:text-lg group-hover:text-[#004896]'>{p.name}</p>
                                        <p className='font-normal text-xs text-slate-500'>by {p.shop.name}</p>
                                        <p className='font-semibold'>RWF {p.price}</p>

                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        )
        }
    </>)
}

export default Home
