import {
    BellIcon,
    ChatIcon,
    MenuAlt2Icon
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import backUpPImage from '../../images/profile.png'

interface IHeader {
    isClosed: boolean
    setIsClosed: React.Dispatch<React.SetStateAction<boolean>>
    isStatic: boolean
    name: string
}

const Header = ({ isClosed, setIsClosed, isStatic, name }: IHeader) => {

    const { profile } = useSelector((state: RootState) => state.profile);

    return (
        <>
            <div className='sticky top-0 text-white  bg-[#004896] z-10'>
                <div className='flex items-center justify-between h-16 -mb-px'>
                    {/* Hamburger button */}
                    <div className='flex  items-center'>
                        {!isStatic &&
                            (
                                <button
                                    tabIndex={1}
                                    className='text-slate-500 hover:text-slate-600 lg:hidden'
                                    title='open sidebar'
                                    aria-label='Open Sidebar'
                                    aria-hidden={isClosed}
                                    onClick={() => setIsClosed(false)}
                                >
                                    <span className='sr-only'>Open sidebar</span>
                                    <MenuAlt2Icon
                                        className='w-6 h-6 text-white'
                                        aria-hidden={true}
                                    />
                                </button>
                            )}
                        <h2 className='font-medium text-lg lg:font-bold mx-2  lg:text-2xl'>
                            <span className=''>{name}</span>  Dashboard
                        </h2>
                    </div>
                    <div className='flex items-center justify-evenly space-x-3 mx-4'>
                        <div className='justify-center items-center hidden md:flex'>
                            <div className='relative'>
                                <input
                                    type='text'
                                    className='rounded-full focus:outline-none px-2 py-1 lg:px-4 lg:py-2'
                                    placeholder='Search anything...'
                                />
                                <div className='absolute top-2 lg:top-3 right-3 text-slate-400'>
                                    <SearchIcon className='w-5 h-5' />
                                </div>
                            </div>
                        </div>
                        <div>
                            <BellIcon className='md:w-7 w-6' />
                        </div>
                        <div>
                            <ChatIcon className='md:w-7 w-6' />
                        </div>
                        <div className='flex flex-row justify-center items-center space-x-2'>
                            <img
                                src={
                                    'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/pexels-edgar-okioga-730353.jpg'
                                    // profile?.profile_image === null ? backUpPImage : profile?.profile_image
                                }
                                className='w-6 h-6 md:w-9 md:h-9 rounded-full mx-auto'
                                alt='pImg'
                            />
                            <p className='sr-only lg:not-sr-only'>{profile?.full_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Header
