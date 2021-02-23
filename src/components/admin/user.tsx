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

    const { isLoading, currentUser, error } = useSelector((state: RootState) => state.user)
    console.log('......................', error, currentUser)

    const [isClosed, setIsClosed] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [tin_no, setTin_no] = useState<string>('')
    const [email, setEmail] = useState<string | null>(null)
    const [contact, setContact] = useState<string | null>(null)
    const [is_verified, setIs_verified] = useState<boolean>(false)
    const [full_name, setFull_name] = useState<string | null>(null)
    const [account_type, setAccount_type] = useState<string | null>(null)

    const updateUser = () => {
        dispatch(getUser())
        console.log({ tin_no, contact, full_name, is_verified, account_type })
        update(dispatch, user, userFailed, `/admin/user/${id}`, { tin_no, contact, email, full_name, is_verified, account_type }, token)
    }

    useEffect(() => {
        if (currentUser) {
            setEditMode(false)
            setEmail(currentUser.email)
            setTin_no(currentUser.tin_no)
            setContact(currentUser.contact)
            setFull_name(currentUser.full_name)
            setIs_verified(currentUser.is_verified)
            setAccount_type(currentUser.account_type)
        }
    }, [currentUser])

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
                                            src='https://izitini-spaces.fra1.digitaloceanspaces.com/profile-pics/profile.png' alt='profile' />
                                    </div>
                                    <form action=''>
                                        <div className='flex md:justify-center'>
                                            <Transition show={!editMode} className='space-y-6 mx-2'>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='names'>Names:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none`}
                                                        id='grid-first-name' type='text' value={currentUser.full_name} />

                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='contact'>Contact:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none`}
                                                        id='grid-last-name' type='text' value={currentUser.contact} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Tin no'>Tin no:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none`}
                                                        id='grid-last-name' type='text' value={currentUser.tin_no || 'N/A'} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Account type'>Account:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={currentUser.account_type} />

                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='email'>Email:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={currentUser.email} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Provider'>Provider:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={currentUser.provider} />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Verified'>Verified:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={`${currentUser.is_verified}`} />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='created At'>created At:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={format(new Date(currentUser.createdAt), 'dd.MM.yyyy')} />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Updated At'>Updated At:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={format(new Date(currentUser.updatedAt), 'dd.MM.yyyy')} />
                                                </div>

                                            </Transition>

                                            <Transition show={!!editMode} className='space-y-6 mx-2 mt-9'>

                                                {/* display error */}
                                                <Transition show={!!error} className='p-1 border border-red-500 bg-red-200 text-red-500'>
                                                    {error?.message}</Transition>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='names'>Names:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto`}
                                                        id='grid-first-name' type='text' defaultValue={currentUser.full_name}
                                                        onChange={e => setFull_name(e.target.value)} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='contact'>Contact:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto`}
                                                        id='grid-last-name' type='text' defaultValue={currentUser.contact}
                                                        onChange={e => setContact(e.target.value)} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Tin no'>Tin no:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto`}
                                                        id='grid-last-name' type='text' defaultValue={currentUser.tin_no}
                                                        onChange={e => setTin_no(e.target.value)} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='email'>Email:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto'
                                                        id='grid-last-name' type='text' defaultValue={currentUser.email}
                                                        onChange={e => setEmail(e.target.value)} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Account type'>Account:</label>

                                                    <select
                                                        className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                        border-gray-400 focus:border-gray-800 w-8/12 md:w-auto'
                                                        id='grid-state'
                                                        defaultValue={currentUser.account_type}
                                                        onChange={e => setAccount_type(e.target.value)}
                                                    >
                                                        <option>{currentUser.account_type}</option>
                                                        <option>{currentUser.account_type === 'business' ? 'customer' : 'business'}</option>
                                                    </select>
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Verified'>Verified:</label>

                                                    <div className='w-8/12 flex justify-center space-x-5 '>
                                                        <div className='space-x-1'>
                                                            <input type="checkbox" id="true" name="true"
                                                                checked={!!is_verified || false}
                                                                onClick={e => setIs_verified(true)} />
                                                            <label htmlFor="True">True</label>
                                                        </div>

                                                        <div className='space-x-1'>
                                                            <input type="checkbox" id="false" name="false"
                                                                checked={!is_verified ? true : false}
                                                                onClick={e => setIs_verified(false)} />
                                                            <label htmlFor="False">False</label>
                                                        </div>
                                                    </div>
                                                </div>

                                            </Transition>
                                        </div>

                                        <div className='flex justify-center my-5 '>
                                            <Transition
                                                show={!!editMode}
                                            >
                                                <button className='py-3 px-6 bg-dark-blue rounded-md text-white text-sm md:text-base font-semibold'
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        return updateUser()
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

export default User
