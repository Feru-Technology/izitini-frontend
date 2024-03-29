import { useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { Link } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { createNewUser, useOpenCreatedUser } from '../../api/user'

const CreateCustomer = () => {

  useAuth('admin')
  const dispatch = useDispatch()

  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  const [isClosed, setIsClosed] = useState(true)
  const [email, setEmail] = useState<string | null>(null)
  const [tin_no, setTin_no] = useState<string>('')
  const [contact, setContact] = useState<string | null>(null)
  const [full_name, setFull_name] = useState<string | null>(null)

  const { isLoading, error } = useSelector((state: RootState) => state.createUser)

  useOpenCreatedUser()

  return (
    <>
      <div className='flex h-screen overflow-hidden bg-slate-200'>
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
                  <h6 className='text-slate-500 text-sm font-bold md:text-base lg:text-lg'>
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
                      className='block uppercase text-slate-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Full Names
                    </label>
                    <input
                      type='text'
                      className='border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white
                      rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150 focus:border-[#004896]'
                      placeholder='Full Names'
                      onChange={e => setFull_name(e.target.value)}
                    />
                  </div>
                  <div className='w-full mb-3'>
                    <label
                      className='block uppercase text-slate-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Contact
                    </label>
                    <input
                      type='text'
                      className='border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white
                      rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150 focus:border-[#004896]'
                      placeholder='contact'
                      onChange={e => setContact(e.target.value)}
                    />
                  </div>
                  <div className='w-full mb-3'>
                    <label
                      className='block uppercase text-slate-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Email
                    </label>
                    <input
                      type='email'
                      className='border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white
                      rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150 focus:border-[#004896]'
                      placeholder='Email'
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='w-full mb-3'>
                    <label
                      className='block uppercase text-slate-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Tin no
                    </label>
                    <input
                      type='TinNo'
                      className='border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white
                      rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150 focus:border-[#004896]'
                      placeholder='TinNo'
                      onChange={e => setTin_no(e.target.value)}
                    />
                  </div>
                  <div className='text-center mt-6'>
                    <button
                      className='bg-[#004896] text-white active:bg-slate-600 text-sm font-bold uppercase mb-4 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                      type='button'
                      onClick={e => {
                        e.preventDefault()
                        return createNewUser(dispatch, 'user', { email, tin_no, contact, full_name })
                      }}
                    >
                      {isLoading ? 'Loading...' : 'Create'}
                    </button>
                    <p> <Link to={'/admin/users/create-vendor'}>Or <span className='text-[#004896]'>Create a Vendor</span></Link> </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateCustomer
