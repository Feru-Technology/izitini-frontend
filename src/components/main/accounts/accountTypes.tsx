import { Link } from 'react-router-dom'

const AccountTypes = () => {
    return (
        <div>

            <div className='w-full mx-auto pt-6'>
                <div>
                    <h1 className='my-6 flex justify-center'>
                        <Link to={'/'}>
                            <img
                                src='https://izitini-spaces.fra1.digitaloceanspaces.com/system-images/Logo1.png'
                                className='w-auto h-12 md:h-16 lg:h-20 xl:h-24'
                                alt='logo'
                            />
                        </Link>
                    </h1>
                </div>
                <div className='flex justify-center my-6'>
                    <span className='font-serif font-light text-xl md:text-2xl'>Who are you?</span>
                </div>

                <div className='md:flex justify-center font-sans font-extralight md:text-lg lg:text-xl'>
                    <div className='bg-gray-100 mx-5 p-5 border-2 border-gray-200 my-5 md:w-72 lg:w-80
                    hover:bg-dark-blue hover:text-white'>
                        <Link to='/signup'>
                            <span className='flex justify-center font-normal'>Customer</span>
                            <p className='flex justify-center'>I want to buy construction tools for my home</p>
                        </Link>
                    </div>

                    <div className='bg-gray-100 mx-5 p-5 border-2 border-gray-200 my-5 md:w-72 lg:w-80
                    hover:bg-dark-blue hover:text-white'>
                        <span className='flex justify-center font-normal'>Professional</span>
                        <p className='flex justify-center'>I fix peoples homes</p>
                    </div>
                </div>

                <div className='md:flex justify-center font-sans font-extralight md:text-lg lg:text-xl'>
                    <div className='bg-gray-100 mx-5 p-5 border-2 border-gray-200 my-5 md:w-72 lg:w-80
                    hover:bg-dark-blue hover:text-white'>
                        <span className='flex justify-center font-normal'>Contractor</span>
                        <p className='flex justify-center'>I own a construction company</p>
                    </div>

                    <div className='bg-gray-100 mx-5 p-5 border-2 border-gray-200 my-5 md:w-72 lg:w-80
                    hover:bg-dark-blue hover:text-white'>
                        <span className='flex justify-center font-normal'>Vendor</span>
                        <p className='flex justify-center'>I own a construction shop</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountTypes
