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
}

const Header = ({ isClosed, setIsClosed, isStatic }: IHeader) => {

    const { profile } = useSelector((state: RootState) => state.profile);

    return (
        <>
            <div className='sticky top-0 text-white  bg-dark-blue'>
                <div className='flex items-center justify-between h-16 -mb-px'>
                    {/* Hamburger button */}
                    <div className='flex  items-center'>
                        {!isStatic &&
                            (
                                <button
                                    tabIndex={1}
                                    className='text-gray-500 hover:text-gray-600 lg:hidden'
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
                        <h2 className='font-bold font-lg mx-2  text-2xl'>
                            Dashboard
                        </h2>
                    </div>
                    <div className='flex items-center justify-evenly space-x-3 mx-4'>
                        <div className='justify-center items-center hidden md:flex'>
                            <div className='relative'>
                                <input
                                    type='text'
                                    className='rounded-full focus:outline-none px-4 py-2'
                                    placeholder='Search anything...'
                                />
                                <div className='absolute top-3 right-3 text-gray-400'>
                                    <SearchIcon className='w-5 h-5' />
                                </div>
                            </div>
                        </div>
                        <div>
                            <BellIcon className='h-5 w-5 ' />
                        </div>
                        <div>
                            <ChatIcon className='h-5 w-5 ' />
                        </div>
                        <div className='flex flex-row justify-center items-center space-x-2'>
                            <img
                                src={profile?.user.profile_image === null ? backUpPImage : profile?.user.profile_image}
                                className='w-9 h-9 rounded-full mx-auto'
                                alt='pImg'
                            />
                            <p className='sr-only lg:not-sr-only'>{profile?.user.full_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Header
