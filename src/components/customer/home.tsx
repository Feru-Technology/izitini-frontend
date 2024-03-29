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
import shorten from '../../utils/common/shotenString'
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

const Home = () => {

    const { categories } = useSelector((state: RootState) => state.categories)
    const categorySection = categories.slice(0, 9)

    useAds()
    const { ads } = useSelector((state: RootState) => state.ad)

    useProducts()
    const { isLoading, products } = useSelector((state: RootState) => state.allProducts)
    const newProducts = products.slice(0, 10)

    const testAds = [
        'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/slide/istockphoto-1202957913-1024x1024.jpg?t=2022-12-20T20%3A00%3A10.062Z',
        'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/slide/pexels-anete-lusina-4792488.jpg?t=2022-12-20T20%3A00%3A42.017Z',
        'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/slide/pexels-anete-lusina-4792494.jpg?t=2022-12-20T20%3A00%3A55.936Z',
        'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/slide/pexels-atul-maurya-1042152.jpg?t=2022-12-20T20%3A01%3A11.110Z',
        'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/slide/pexels-jorge-urosa-9131069.jpg?t=2022-12-20T20%3A01%3A23.590Z',
        'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/slide/pexels-pixabay-162534.jpg?t=2022-12-20T20%3A01%3A47.221Z',
        'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/slide/pexels-pixabay-209235.jpg?t=2022-12-20T20%3A01%3A59.159Z',
        'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/slide/pexels-suntorn-somtong-1029243.jpg?t=2022-12-20T20%3A02%3A09.973Z',
        'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/slide/pexels-valeria-boltneva-1123262.jpg?t=2022-12-20T20%3A02%3A23.550Z'
    ]

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
                            <ul className='ml-2 mt-2.5
                        md:w-full md:h-64 md:overflow-y-scroll'>
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
                                {/* {ads.map((ad) => (
                                    <div className='h-60 md:h-72' key={ad.id}>
                                        <img alt='ads' src={ad.big_screen_image} />
                                    </div>))} */}

                                {testAds.map((testAd, index) => (
                                    <div className='h-60 md:h-72' key={index}>
                                        <img alt='testAds' src={testAd} />
                                    </div>))}

                            </Carousel>
                        </div>
                    </div>

                    {/* categories */}
                    <div className='md:mt-4 lg:mt-8 font-medium grid grid-cols-1
                    md:grid-cols-2 lg:grid-cols-3 xl:gap-4 gap-3'>
                        {categorySection.map((category) => {
                            const subCategories = category.subCategories.slice(0, 3)
                            return (
                                <Link to={`/products/c/${category.name}`} key={category.id}>
                                    <div className='relative my-2 group'>
                                        <div className='hover:underline'>
                                            <p className='absolute px-2 ml-2 group-hover:underline group-hover:bg-white/50 rounded'>{category.name}</p>
                                            <img className='h-40  2xl:h-52 w-full bg-slate-200 lg:h-44 xl:h-52 hover:shadow-sm'
                                                src={
                                                    // category.image_url 
                                                    'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/pexels-pixabay-534220.jpg?t=2022-12-20T17%3A52%3A59.482Z'
                                                } alt='' />
                                        </div>

                                        <ul>
                                            {
                                                subCategories.map((subCat) => (
                                                    <li key={subCat.id}
                                                        className='font-light hover:underline hover:text-[#004896]'>{subCat.name}</li>
                                                ))
                                            }
                                            {category.subCategories.length > 3 ?
                                                <p className='text-[#004896] hover:underline'>see all</p> : ''}
                                        </ul>

                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                    {/* recent updates */}
                    <div className='lg:mb-8 lg:mt-3 font-normal'>
                        <span>Recent Updates</span>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
                            {newProducts.map((p) => (
                                <div className='mt-2 w-full group' key={p.id}>
                                    <Link to={`/products/p/${p.id}`} className='w-full'>
                                        <img className='w-ful max-h-32 2xl:max-h-52 mx-auto'
                                            src={p.display_image || 'https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png'} alt='' />

                                        <button className='text-black bg-slate-100 group-hover:bg-slate-300 w-full rounded my-2'>More</button>
                                        <p className='text-slate-800 text-md group-hover:text-[#004896]'>{shorten(p.name, 55)}</p>
                                        <p className='font-normal text-xs text-slate-500'>by {p.shop.name}</p>
                                        <p className='font-semibold mt-2'>RWF {p.price}</p>

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
