import { useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { useSelector } from 'react-redux'
import { useStores } from '../../api/stores'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useAuth } from '../../utils/hooks/auth'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'

const Shops = () => {

    useAuth('admin')
    const navigate = useNavigate()
    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(true)

    useStores()
    const { isLoading, stores } = useSelector((state: RootState) => state.stores)

    return (
        <>
            {isLoading ? (<h1>loading ...</h1>)
                : stores ? (
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

                            <div className='px-2 md:px-6 lg:px-14 w-full'>

                                <div className='flex items-center justify-between py-8'>
                                    <h3 className='text-lg md:text-xl lg:text-2xl font-bold'>Shops</h3>
                                    <button className='bg-[#004896] hover:bg-[#0e87d2] text-white font-bold
                                            py-2 px-4 rounded cursor-pointer text-sm md:text-base' >
                                        <Link to='/admin/shops/create'>ADD A Shop</Link>
                                    </button>
                                </div>

                                <div className='w-full my-4 md:my-5 lg:my-6 '>
                                    <table className='w-full border-slate-200 text-slate-600 border'>
                                        <thead className=''>
                                            <tr className='font-bold text-xs md:text-sm text-center border-b'>
                                                <th
                                                    scope='col'
                                                    className='
                                                w-2/5 py-3 lg:text-base
                                    '
                                                >Name</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base
                                    '
                                                >Email</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base
                                    '
                                                >Contacts</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base
                                    '
                                                >About Shop</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {stores.map((store) => {
                                                const storeImage = store.shop_image_url || 'https://izitini-spaces.fra1.digitaloceanspaces.com/system-images/Logo1.png'
                                                return (

                                                    <tr key={store.id}
                                                        className='text-center text-xs md:text-sm lg:text-base border-b
                                                    text-slate-800 hover:bg-slate-100'
                                                        onClick={() => navigate(`/admin/shops/${store.id}`)} >
                                                        <td className='py-3 '>
                                                            <div className='md:flex items-center'>
                                                                <div className='md:w-1/4 mx-3'>
                                                                    <img src={storeImage} alt='img' className='w-auto h-8 md:h-12 lg:h-16' />
                                                                </div>
                                                                <div className='md:w-2/4'>

                                                                    <p className='font-normal text-sm'>
                                                                        <span className=''>{store.name}</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='py-3 '>
                                                            <p className='font-normal text-sm'>{store.shop_email}</p>
                                                        </td>
                                                        <td className='py-3 '>
                                                            <p className='font-normal text-sm'>{store.shop_contact_no}</p>
                                                        </td>
                                                        <td className='py-3 '>
                                                            <p className='font-normal text-sm'>{store.about_shop}</p>
                                                        </td>
                                                    </tr>)
                                            })
                                            }
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div>
                    </div>

                )
                    : <div></div>

            }
        </>
    )
}

export default Shops
