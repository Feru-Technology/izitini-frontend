import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'


export const CategoryBar = () => {


    const { isLoading, categories } = useSelector((state: RootState) => state.category);
    const categoryBar = categories.slice(0, 8)
    return (
        <>
            {isLoading ? (<h1>Loading ...</h1>) :
                (<div className='
                sr-only
                md:not-sr-only border-t-2 border-b-2 border-gray-300
                flex justify-center
                bg-gray-100 mt-2'>
                    <ul className='flex md:space-x-4 lg:space-x-8'>

                        {categoryBar.map((v) => (<li className='font-bold text-gray-600 py-2
                        md:text-xs lg:text-sm xl:text-base 2xl:text-lg'>{v.name}</li>))}

                        <button type='submit' className='font-medium text-dark-blue
                        md:text-xs lg:text-sm xl:text-base'>More</button>
                    </ul>
                </div>)}
        </>
    )
}

