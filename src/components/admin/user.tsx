import SiderBar from './SiderBar'
import { format } from 'date-fns'
import Header from '../vendor/Header'
import { GrEdit } from 'react-icons/gr'
import { useState, useEffect } from 'react'
import { fetch, update } from '../../api/apiAction'
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import {
    user,
    getUser,
    userFailed
} from '../../redux/admin/users/user.slice'
const User = () => {

    // redux
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const { id } = useParams()

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    useEffect(() => {
        dispatch(getUser())
        fetch(dispatch, user, userFailed, `/users/${id}`)
    }, [dispatch, id])

    const { isLoading, currentUser } = useSelector((state: RootState) => state.user)
    console.log('......................', currentUser)

    const [isClosed, setIsClosed] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [tin_no, setTin_no] = useState<string | undefined>(currentUser?.tin_no)
    const [contact, setContact] = useState<string | undefined>(currentUser?.contact)
    const [full_name, setFull_name] = useState<string | undefined>(currentUser?.full_name)

    const updateUser = () => {
        dispatch(getUser())
        update(dispatch, user, userFailed, `/users/${id}`, { tin_no, contact, full_name }, token)
    }

    return (
        <>
            {isLoading ? (<h1>loading ...</h1>) :
                currentUser ? (
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
                                        <img className='h-20 rounded-full'
                                            src="https://izitini-spaces.fra1.digitaloceanspaces.com/profile-pics/profile.png" alt="profile" />
                                    </div>
                                    <form action="">
                                        <div className='flex md:justify-center'>
                                            <Transition show={!editMode} className='space-y-6 mx-2'>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="names">Names:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none`}
                                                        id='grid-first-name' type='text' value={currentUser.full_name} />

                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="contact">Contact:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none`}
                                                        id='grid-last-name' type='text' value={currentUser.contact} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Tin no">Tin no:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none`}
                                                        id='grid-last-name' type='text' value={currentUser.tin_no || 'N/A'} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Account type">Account:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={currentUser.account_type} />

                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="email">Email:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={currentUser.email} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Provider">Provider:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={currentUser.provider} />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Verified">Verified:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={`${currentUser.is_verified}`} />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="created At">created At:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={format(new Date(currentUser.createdAt), 'dd.MM.yyyy')} />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Updated At">Updated At:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={format(new Date(currentUser.updatedAt), 'dd.MM.yyyy')} />
                                                </div>

                                            </Transition>

                                            <Transition show={!!editMode} className='space-y-6 mx-2 mt-9'>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="names">Names:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto`}
                                                        id='grid-first-name' type='text' />

                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="contact">Contact:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto`}
                                                        id='grid-last-name' type='text' />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Tin no">Tin no:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto`}
                                                        id='grid-last-name' type='text' />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="email">Email:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto'
                                                        id='grid-last-name' type='text' />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Account type">Account:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto'
                                                        id='grid-last-name' type='text' />

                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Verified">Verified:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto'
                                                        id='grid-last-name' type='text' value={`${currentUser.is_verified}`} />
                                                </div>

                                            </Transition>
                                        </div>

                                        <div className='flex justify-center my-5 '>
                                            <Transition
                                                show={!!editMode}
                                            >
                                                <button className='py-3 px-6 bg-dark-blue rounded-md text-white text-sm md:text-base font-semibold'>
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
                ) : <div className='mt-24 ml-24 font-bold text-base'>Product not found</div>

            }
        </>
    )
}

export default User
function setEditModeMode(arg0: boolean): void {
    throw new Error('Function not implemented.')
}

