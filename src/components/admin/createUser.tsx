import { useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const CreateUser = () => {

  // redux
  const dispatch = useDispatch()

  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  const [isClosed, setIsClosed] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [contact, setContact] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [full_name, setFull_name] = useState<string | null>(null)

  const navigate = useNavigate()

  const { profile, error } = useSelector((state: RootState) => state.profile)

  if (profile) navigate('/')

  return (

    <div>
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

        <div className='w-full lg:w-5/12 px-4 mx-auto pt-6'>
          <div className='relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg bg-white shadow hover:shadow-md ease-linear transition-all duration-150'>
            <div className='rounded-t mb-0 px-6 py-6'>
              <div className='text-center mb-3'>
                <h6 className='text-gray-500 text-sm font-bold'>
                  Sign in with
                </h6>
              </div>
            </div>
            <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
              <form>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Full Names
                  </label>
                  <input
                    type='text'
                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                    placeholder='Full Names'
                    onChange={e => setFull_name(e.target.value)}
                  />
                </div>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Contact
                  </label>
                  <input
                    type='text'
                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                    placeholder='contact'
                    onChange={e => setContact(e.target.value)}
                  />
                </div>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className='inline-flex items-center cursor-pointer'>
                    <input
                      id='customCheckLogin'
                      type='checkbox'
                      className='form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
                    />
                    <span className='ml-2 text-sm font-semibold text-gray-600'>
                      Remember me
                    </span>
                  </label>
                </div>
                <div>

                  <Transition
                    show={!!error}
                  >
                    <p className='w-full py-1  text-red-700 text-center '>{error?.message}</p>

                  </Transition>
                </div>
                <div className='text-center mt-6'>
                  <button
                    className='bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                    type='button'
                  // onClick={ }
                  >
                    Sign Up
                  </button>
                </div>
                <hr className='text-gray-600 mb-4' />
                <div className='text-right'>
                  <p className='font-medium'>
                    <span className='text-gray-800'> Already have an account ? </span>
                    <Link to='/signin' className='text-light-blue hover:underline hover:text-middle-blue'>Sign in</Link> </p>

                  <p>By sign in,I agree to izitini's Terms of use and  Privacy Policy</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUser
