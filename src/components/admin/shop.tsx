import SiderBar from './SiderBar'
import { format } from 'date-fns'
import Header from '../vendor/Header'
import { useState, useEffect } from 'react'
import { fetch, update } from '../../api/apiAction'
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import {
    store,
    getStore,
    storeFailed
} from '../../redux/stores/store.slice'
const Shop = () => {

    // redux
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const { id } = useParams()

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    useEffect(() => {
        dispatch(getStore())
        fetch(dispatch, store, storeFailed, `/shop/${id}`)
    }, [dispatch, id])

    const { isLoading, currentStore, error } = useSelector((state: RootState) => state.store)


    const [isClosed, setIsClosed] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [about_shop, setAbout_shop] = useState<string>('')
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [contact, setContact] = useState<string | null>(null)
    const [is_approved, setIs_approved] = useState<boolean>(false)
    const [is_blocked, setIs_blocked] = useState<boolean>(false)

    const updateShop = () => {
        // dispatch(getShop())
        // console.log({ about_shop, contact, name, is_approved, is_blocked })
        // update(dispatch, shop, shopFailed, `/admin/shop/${id}`, { about_shop, contact, email, name, is_approved, is_blocked }, token)
    }

    useEffect(() => {
        if (currentStore) {
            setEditMode(false)
            setName(currentStore.name)
            setEmail(currentStore.shop_email)
            setAbout_shop(currentStore.about_shop)
            setContact(currentStore.shop_contact_no)
            setIs_approved(currentStore.is_approved)
            setIs_blocked(currentStore.is_blocked)
        }
    }, [currentStore])

    console.log(currentStore);

    return (
        <>
            {isLoading ? (<h1>loading ...</h1>) :
                currentStore ? (
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

                            {/* admin dashboard */}

                            <div className='w-full flex justify-center'>
                                <div className='mx-4 md:mx-0 md:w-full'>
                                    <div className='flex my-5 justify-center'>
                                        <img className='h-32 rounded-lg'
                                            src='https://izitini-spaces.fra1.digitaloceanspaces.com/profile-pics/profile.png' alt='profile' />
                                    </div>
                                    <form action=''>
                                        <div className='flex md:justify-center'>
                                            <div className='space-y-6 mx-2'>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='names'>Name:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none`}
                                                        id='grid-first-name' type='text' value={currentStore.name} />

                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='contact'>Contact:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none`}
                                                        id='grid-last-name' type='text' value={currentStore.shop_contact_no} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Tin no'>About:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none`}
                                                        id='grid-last-name' type='text' value={currentStore.about_shop || 'N/A'} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='email'>Email:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={currentStore.shop_email} />
                                                </div>

                                                {currentStore.shopSpecialties.map((specialties) => (
                                                    <div className='space-x-2 md:space-x-4 flex w-full'>
                                                        <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                            htmlFor='Specialty type'>Specialty:</label>
                                                        <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                            id='grid-last-name' type='text'
                                                            value={specialties.category.name}
                                                        />
                                                    </div>
                                                ))}

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Owner'>Owner:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text'
                                                        value={currentStore.owner.full_name}
                                                    />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Approved'>Approved:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={`${currentStore.is_approved}`} />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='created At'>created At:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={format(new Date(currentStore.createdAt), 'dd.MM.yyyy')} />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Updated At'>Updated At:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={format(new Date(currentStore.updatedAt), 'dd.MM.yyyy')} />
                                                </div>

                                            </div>
                                        </div>

                                        <div className='flex justify-center my-5 '>
                                            <Transition
                                                show={!!editMode}
                                            >
                                                <button className='py-3 px-6 bg-dark-blue rounded-md text-white text-sm md:text-base font-semibold'
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        return updateShop()
                                                    }} >
                                                    SAVE
                                                </button>
                                            </Transition>
                                            <Transition
                                                show={!editMode}>
                                                <button className='py-3 px-6 bg-dark-blue rounded-md text-white text-sm md:text-base font-semibold'
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        return setEditMode(true)
                                                    }} >
                                                    Edit
                                                </button>
                                            </Transition>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <div className='mt-24 ml-24 font-bold text-base'>{error?.message}</div>

            }
        </>
    )
}

export default Shop
