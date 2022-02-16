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
                                className=''
                                width='100px'
                                height='100px'
                                alt='logo'
                            />
                        </Link>
                    </h1>
                </div>
                <div className='flex justify-center my-6'>
                    <span className='font-serif font-light text-xl'>Who are you?</span>
                </div>

                <div className='md:flex justify-center font-sans font-extralight'>
                    <div className='bg-gray-100 mx-5 p-5 border-2 border-gray-200 my-5
                    hover:bg-dark-blue hover:text-white'>
                        <span className='flex justify-center font-normal'>Customer</span>
                        <p className='flex justify-center'>I want to buy construction tools for my home</p>
                    </div>

                    <div className='bg-gray-100 mx-5 p-5 border-2 border-gray-200 my-5
                    hover:bg-dark-blue hover:text-white'>
                        <span className='flex justify-center font-normal'>Professional</span>
                        <p className='flex justify-center'>I fix peoples homes</p>
                    </div>

                    <div className='bg-gray-100 mx-5 p-5 border-2 border-gray-200 my-5
                    hover:bg-dark-blue hover:text-white'>
                        <span className='flex justify-center font-normal'>Contractor</span>
                        <p className='flex justify-center'>I own a construction company</p>
                    </div>

                    <div className='bg-gray-100 mx-5 p-5 border-2 border-gray-200 my-5
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
