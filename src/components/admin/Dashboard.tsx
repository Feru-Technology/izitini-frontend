import { useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'

const AdminDashboard = () => {

    const { isLoading, profile } = useSelector((state: RootState) => state.profile);

    const [isClosed, setIsClosed] = useState(false)
    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const navigate = useNavigate()

    const accountType = profile?.account_type
    // console.log(accountType)

    return (
        <>
            {isLoading ? (<h1>loading ...</h1>)
                : !profile ? navigate('/signin') :
                    // : profile?.user.account_type === 'admin' 

                    (
                        <div className='flex h-screen overflow-hidden'>
                            <SiderBar
                                isClosed={isClosed}
                                setIsClosed={setIsClosed}
                                isStatic={isStatic}
                            />

                            <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                                <Header
                                    isClosed={isClosed}
                                    setIsClosed={setIsClosed}
                                    isStatic={isStatic}
                                    name={'Admin'}
                                />
                                <Transition
                                    appear={true}
                                    show={!isStatic && !isClosed}
                                    enter='transition-opacity duration-200'
                                    enterFrom='opacity-0'
                                    enterTo='opacity-50'
                                    leave='transition-opacity duration-200'
                                    leaveFrom='opacity-50'
                                    leaveTo='opacity-0'
                                >
                                    <div className='fixed inset-0 bg-black opacity-60 z-10' />
                                </Transition>

                                {/* customer dashboard */}
                                <div className='p-5 flex flex-col justify-center'>
                                    <p>recent activities</p>
                                    <p>Become a vendor</p>

                                </div>
                            </div>
                        </div>
                    )
                // : navigate('')

            }
        </>
    )
}

export default AdminDashboard
