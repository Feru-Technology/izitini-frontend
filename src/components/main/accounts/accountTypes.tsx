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
                <div className='flex justify-center'>
                    <span>Who are you?</span>
                </div>

                <div className='flex justify-center'>
                    <div>Customer</div>
                    <div>Vendor</div>
                    <div>Profession</div>
                </div>
            </div>
        </div>
    )
}

export default AccountTypes
