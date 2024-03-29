import { Footer } from './footer'
import { Navbar } from './navbar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CategoryBar } from './categoryBar'
import { RootState } from '../../redux/store'

const MyProducts = () => {

    const { categories } = useSelector((state: RootState) => state.categories)

    return (<>
        <div className='font-nova'>
            < Navbar />
            < CategoryBar
            />
            {categories.length !== 0 ?
                (

                    <div className='mx-5 md:mx-10 lg:mx-12 xl:mx-24'>

                        {/* navigation */}
                        <div className='flex mt-4 lg:mt-8 font-semibold text-xs md:text-sm'>
                            <p className='text-slate-500'>All Products</p>
                        </div>

                        {/* categories */}
                        <div className='md:my-4 lg:my-8 font-medium grid grid-cols-1
                        md:grid-cols-2 lg:grid-cols-3 xl:gap-4 gap-3'>
                            {categories.map((category) => {
                                const subCategories = category.subCategories.slice(0, 3)
                                return (
                                    <Link to={`/products/c/${category.name}`} key={category.id}>
                                        <div className='relative my-2 group'>
                                            <p className='absolute ml-2 px-2 rounded group-hover:underline group-hover:bg-white/50'>{category.name}</p>
                                            <img className='h-36  2xl:h-52 w-full bg-slate-200 lg:h-40 xl:h-48'
                                                src={
                                                    // category.image_url || 'https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png'
                                                    'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/pexels-pixabay-534220.jpg?t=2022-12-20T17%3A52%3A59.482Z'
                                                } alt='' />


                                            <ul>
                                                {
                                                    subCategories.map((subCat) => (
                                                        <li className='mt-1 font-normal hover:text-[#004896] hover:underline' key={subCat.id}>{subCat.name}</li>
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

                    </div>

                ) : (<div className='font-normal flex justify-center'
                >No Product yet</div>)}
            <Footer />
        </div>
    </>)
}

export default MyProducts
