import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    MenuAlt2Icon
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'

interface IHeader {
    isClosed: boolean
    setIsClosed: React.Dispatch<React.SetStateAction<boolean>>
    isStatic: boolean
}

const Header = ({ isClosed, setIsClosed, isStatic }: IHeader) => {
    // const handleClick = () =>{
    //     setIsClosed(false);
    // }
    return (
        <div className='sticky top-0 text-white  bg-header-blue'>
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
                                    <SearchIcon className='w-5 h-5'/>
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
                            src='https://media.istockphoto.com/vectors/african-american-beautiful-smiling-woman-with-long-straight-hair-vector-id1206844727?k=20&m=1206844727&s=612x612&w=0&h=JlSUV6FNxGNkgYT2hfz4I6AQjL4xHKBXDG0aYcxIMRA='
                            className='w-9 h-9 rounded-full mx-auto'
                            alt='admin'
                        />
                        <p className=''>Admin</p>
                        <ChevronDownIcon className='h-5 w-5' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
