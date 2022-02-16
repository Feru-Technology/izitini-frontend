import { Link } from 'react-router-dom'

const AccountTypes = () => {
    return (
        <div>

            <div className='w-full lg:w-5/12 mx-auto pt-6'>
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
                    <span>Who are you?</span>
                </div>

                <div className='flex justify-center'>
                    <div className='bg-gray-100 mx-5 p-10 border-2 border-gray-200'>
                        <span>Customer</span>
                        <p>I want to buy construction tools for my home</p>
                    </div>

                    <div className='bg-gray-100 mx-5 p-10 border-2 border-gray-200'>
                        <span>Professional</span>
                        <p>I am fix peoples homes</p>
                    </div>

                    <div className='bg-gray-100 mx-5 p-10 border-2 border-gray-200'>
                        <span>Contractor</span>
                        <p>I own a construction company</p>
                    </div>

                    <div className='bg-gray-100 mx-5 p-10 border-2 border-gray-200'>
                        <span>Vendor</span>
                        <p>I own a construction shop</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountTypes
