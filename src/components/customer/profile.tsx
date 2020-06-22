import { useEffect, useState } from 'react'
import SiderBar from './SiderBar'
import { profile } from 'console'
import { format } from 'date-fns'
import Header from '../vendor/Header'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { update, fetch } from '../../api/apiAction'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUser, user, userFailed } from '../../redux/admin/users/user.slice'

const Profile = () => {

    // redux
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const params = useParams()
    const { id } = params

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    useEffect(() => {
        dispatch(getUser())
        fetch(dispatch, user, userFailed, '/users/my/profile', token)
    }, [dispatch, id, token])

    const { isLoading, currentUser, error } = useSelector((state: RootState) => state.user)

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
        update(dispatch, user, userFailed, '/users/profile', { tin_no, contact, email, full_name, is_verified, account_type }, token)
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
                        name={'Customer'}
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

                    {/* user dashboard */}

                    <div className='w-full flex justify-center bg-gray-100 p-5'>
                        <div className='flex flex-col min-w-0 break-words mb-6  rounded-lg w-full md:w-8/12 lg:w-1/2
                                    bg-white shadow hover:shadow-md ease-linear transition-all duration-150'>
                            <div className='flex my-5 justify-center'>
                                <img className='h-20 rounded-full'
                                    src='https://izitini-spaces.fra1.digitaloceanspaces.com/profile-pics/profile.png' alt='profile' />
                            </div>

                            <div className='px-2 md:px-7'>
                                <form className='w-full'>
                                    <div className=''>
                                        <Transition show={!editMode} className='space-y-6 mx-2'>
                                            <div className=''>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='names'>Names:</label>
                                                <input className={`w-full bg-gray-100 text-sm md:text-base font-medium border 
                                                border-gray-300 pointer-events-none px-3 py-2 rounded text-gray-800`}
                                                    id='grid-first-name' type='text' value={currentUser?.full_name} />

                                            </div>

                                            <div className=''>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='contact'>Contact:</label>
                                                <input className={`w-full bg-gray-100 text-sm md:text-base font-medium border
                                                border-gray-300 pointer-events-none px-3 py-2 rounded text-gray-800`}
                                                    id='grid-last-name' type='text' value={currentUser?.contact} />
                                            </div>

                                            <div className=''>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='Tin no'>Tin no:</label>
                                                <input className={`w-full bg-gray-100 text-sm md:text-base font-medium border
                                                border-gray-300 pointer-events-none px-3 py-2 rounded text-gray-800`}
                                                    id='grid-last-name' type='text' value={currentUser?.tin_no || 'N/A'} />
                                            </div>

                                            <div className=''>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='Account type'>Account:</label>
                                                <input className='w-full bg-gray-100 text-sm md:text-base font-medium border
                                                border-gray-300 pointer-events-none px-3 py-2 rounded text-gray-800'
                                                    id='grid-last-name' type='text' value={currentUser?.account_type} />

                                            </div>

                                            <div className=''>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='email'>Email:</label>
                                                <input className='w-full bg-gray-100 text-sm md:text-base font-medium border
                                                border-gray-300 pointer-events-none px-3 py-2 rounded text-gray-800'
                                                    id='grid-last-name' type='text' value={currentUser?.email} />
                                            </div>

                                            <div className=''>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='Provider'>Provider:</label>
                                                <input className='w-full bg-gray-100 text-sm md:text-base font-medium border
                                                border-gray-300 pointer-events-none px-3 py-2 rounded text-gray-800'
                                                    id='grid-last-name' type='text' value={currentUser?.provider} />
                                            </div>
                                            <div className=''>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='Verified'>Verified:</label>
                                                <input className='w-full bg-gray-100 text-sm md:text-base font-medium border
                                                border-gray-300 pointer-events-none px-3 py-2 rounded text-gray-800'
                                                    id='grid-last-name' type='text' value={`${currentUser?.is_verified}`} />
                                            </div>

                                        </Transition>

                                        <Transition show={!!editMode} className='space-y-6 mx-2 mt-9'>

                                            {/* display error */}
                                            <Transition show={!!error} className='p-1 border border-red-600 bg-red-100 text-red-600'>
                                                {error?.message}</Transition>

                                            <div className=''>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='names'>Names:</label>
                                                <input className={`w-full bg-white text-sm md:text-base font-medium outline-none border
                                                border-gray-400 focus:border-dark-blue px-4 py-3 rounded`}
                                                    id='grid-first-name' type='text' defaultValue={full_name || currentUser?.full_name}
                                                    onChange={e => setFull_name(e.target.value)} />
                                            </div>

                                            <div className=''>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='contact'>Contact:</label>
                                                <input className={`w-full bg-white text-sm md:text-base font-medium outline-none border
                                                border-gray-400 focus:border-dark-blue px-4 py-3 rounded`}
                                                    id='grid-last-name' type='text' defaultValue={contact || currentUser?.contact}
                                                    onChange={e => setContact(e.target.value)} />
                                            </div>

                                            <div className=''>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='Tin no'>Tin no:</label>
                                                <input className={`w-full bg-white text-sm md:text-base font-medium outline-none border
                                                border-gray-400 focus:border-dark-blue px-4 py-3 rounded`}
                                                    id='grid-last-name' type='text' defaultValue={tin_no || currentUser?.tin_no}
                                                    onChange={e => setTin_no(e.target.value)} />
                                            </div>

                                            <div className=''>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='email'>Email:</label>
                                                <input className='w-full bg-white text-sm md:text-base font-medium outline-none border
                                                border-gray-400 focus:border-dark-blue px-4 py-3 rounded'
                                                    id='grid-last-name' type='text' defaultValue={email || currentUser?.email}
                                                    onChange={e => setEmail(e.target.value)} />
                                            </div>

                                            <div className=''>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='Account type'>Account:</label>

                                                <select
                                                    className='w-full bg-white text-sm md:text-base font-medium outline-none border
                                                        border-gray-400 focus:border-dark-blue px-4 py-3 rounded'
                                                    id='grid-state'
                                                    defaultValue={account_type || currentUser?.account_type}
                                                    onChange={e => setAccount_type(e.target.value)}
                                                >
                                                    <option>{currentUser?.account_type}</option>
                                                    <option>{currentUser?.account_type === 'business' ? 'customer' : 'business'}</option>
                                                </select>
                                            </div>

                                            <div className='flex space-x-4'>
                                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                                    htmlFor='Verified'>Verified:</label>

                                                <div className='flex justify-center space-x-5 '>
                                                    <div className='space-x-1'>
                                                        <input type='checkbox' id='true' name='true'
                                                            checked={!!is_verified || false}
                                                            onClick={e => setIs_verified(true)} />
                                                        <label htmlFor='True'>True</label>
                                                    </div>

                                                    <div className='space-x-1'>
                                                        <input type='checkbox' id='false' name='false'
                                                            checked={!is_verified ? true : false}
                                                            onClick={e => setIs_verified(false)} />
                                                        <label htmlFor='False'>False</label>
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
            </div>

        </>)
}

export default Profile
