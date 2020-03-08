import { useState, useEffect } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import axiosAction from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postUser, getUser, userFailed } from '../../redux/admin/users/createUser.slice'

const CreateCustomer = () => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  useAuth('admin')

  // redux
  const dispatch = useDispatch()

  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  const [isClosed, setIsClosed] = useState(true)
  const [email, setEmail] = useState<string | null>(null)
  const [tin_no, setTin_no] = useState<string>('')
  const [contact, setContact] = useState<string | null>(null)
  const [full_name, setFull_name] = useState<string | null>(null)

  const createCustomer = () => {
    dispatch(postUser())
    axiosAction('post', dispatch, getUser, userFailed, '/admin/user', token, { email, tin_no, contact, full_name })
  }

  const { isLoading, createdUser, error } = useSelector((state: RootState) => state.createUser)

  useEffect(() => {
    if (createdUser) {
      const { id } = createdUser.user
      dispatch(getUser(null))
      return navigate(`/admin/users/${id}`
      )
    }
  }, [createdUser, dispatch, navigate])

  const isLoggingIn = useSelector((state: RootState) => state.profile.isLoading)

  return (
    <>
      {isLoggingIn ? 'Loading ...' :
        <div className='flex h-screen overflow-hidden bg-gray-200'>
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

            <div className='px-4 sm:w-5/6 md:w-5/6 lg:w-5/12 flex mx-auto md:mt-44 lg:mt-2'>
              <div className='flex flex-col min-w-0 break-words w-full mb-6  rounded-lg
            bg-white shadow hover:shadow-md ease-linear transition-all duration-150 z-0'>
                <div className='rounded-t mb-0 px-6 py-6'>
                  <div className='text-center mb-3'>
                    <h6 className='text-gray-500 text-sm font-bold md:text-base lg:text-lg'>
                      Create a customer account
                    </h6>
                  </div>
                </div>
                <div className='flex-auto px-4 lg:px-10 pb-10 pt-0'>
                  <form>
                    <div>

                      <Transition
                        show={!!error}
                      >
                        <div className='border border-red-700 bg-red-100'>
                          <p className='w-full py-1  text-red-700 text-center '>
                            {error?.message}
                          </p>
                        </div>

                      </Transition>
                    </div>
                    <div className='w-full mb-3'>
                      <label
                        className='block uppercase text-gray-600 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Full Names
                      </label>
                      <input
                        type='text'
                        className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                      rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150 focus:border-dark-blue'
                        placeholder='Full Names'
                        onChange={e => setFull_name(e.target.value)}
                      />
                    </div>
                    <div className='w-full mb-3'>
                      <label
                        className='block uppercase text-gray-600 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Contact
                      </label>
                      <input
                        type='text'
                        className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                      rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150 focus:border-dark-blue'
                        placeholder='contact'
                        onChange={e => setContact(e.target.value)}
                      />
                    </div>
                    <div className='w-full mb-3'>
                      <label
                        className='block uppercase text-gray-600 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Email
                      </label>
                      <input
                        type='email'
                        className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                      rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150 focus:border-dark-blue'
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <div className='w-full mb-3'>
                      <label
                        className='block uppercase text-gray-600 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Tin no
                      </label>
                      <input
                        type='TinNo'
                        className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                      rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150 focus:border-dark-blue'
                        placeholder='TinNo'
                        onChange={e => setTin_no(e.target.value)}
                      />
                    </div>
                    <div className='text-center mt-6'>
                      <button
                        className='bg-dark-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                        type='button'
                        onClick={e => {
                          e.preventDefault()
                          return createCustomer()
                        }}
                      >
                        {isLoading ? 'Loading...' : 'Create'}
                      </button>
                      <p> <Link to={'/admin/users/create-vendor'}>Or <span className='text-dark-blue'>Create a Vendor</span></Link> </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default CreateCustomer
