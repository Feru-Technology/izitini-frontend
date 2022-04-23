import { useEffect, useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { post } from '../../api/apiAction'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postUser, getUser, userFailed } from '../../redux/admin/users/createUser.slice'
import { fetchingCategories, retrievedCategory, retrievedCategoryFailed } from '../../redux/categories/categories.slice'

const CreateVendor = () => {

  // redux
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  useEffect(() => {
    dispatch(fetchingCategories())
    fetch(dispatch, retrievedCategory, retrievedCategoryFailed, '/admin/category')
  }, [dispatch])

  const { categories } = useSelector((state: RootState) => state.categories)

  const [isClosed, setIsClosed] = useState(false)
  const [name, setName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [tin_no, setTin_no] = useState<string | null>(null)
  const [contact, setContact] = useState<string | null>(null)
  const [full_name, setFull_name] = useState<string | null>(null)
  const [about_shop, setAbout_shop] = useState<string | null>(null)
  const [shop_specialty_1, setShop_specialty_1] = useState<string | null>(null)
  const [shop_specialty_2, setShop_specialty_2] = useState<string | null>(null)

  const navigate = useNavigate()

  const createVendor = () => {
    dispatch(postUser())
    post(dispatch, getUser, userFailed, '/admin/user/vendor', {
      email, tin_no, contact, full_name, name, about_shop, shop_specialty_1, shop_specialty_2
    }, token)
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

  return (
    <>

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

          <div className='px-4 sm:w-5/6 md:w-5/6 lg:w-5/12 flex mx-auto md:mt-9 lg:mt-2'>
            <div className='flex flex-col min-w-0 break-words w-full mb-6  rounded-lg
            bg-white shadow hover:shadow-md ease-linear transition-all duration-150'>
              <div className='rounded-t mb-0 px-6 py-6'>
                <div className='text-center mb-3'>
                  <h6 className='text-gray-500 text-sm font-bold md:text-base lg:text-lg'>
                    Create a vendor account
                  </h6>
                </div>
              </div>
              <div className='flex-auto px-4 lg:px-10 pb-10 pt-0'>
                <form>
                  <div>

                    <Transition
                      show={!!error}
                    >
                      <div className='border border-red-700 bg-red-100 mb-3'>
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
                      placeholder='contacts'
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
                  <div className='w-full mb-3'>
                    <label
                      className='block uppercase text-gray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Shop Name
                    </label>
                    <input
                      type='Shop_name'
                      className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                        rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150 focus:border-dark-blue'
                      placeholder='Shop Name'
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className='w-full mb-3'>
                    <label
                      className='block uppercase text-gray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      About Shop
                    </label>
                    <input
                      type='About Shop'
                      className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                        rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150 focus:border-dark-blue'
                      placeholder='About Shop'
                      onChange={e => setAbout_shop(e.target.value)}
                    />
                  </div>
                  <div>
                    <h3 className='block uppercase text-gray-600 text-xs font-bold mb-2'>shop specialty 1</h3>
                    <div className=''>
                      <select
                        className='block appearance-none w-full bg-white border text-gray-700 py-3 px-4 pr-8 rounded leading-tight
                        border-gray-700 focus:outline-none focus:border-dark-blue'
                        id='grid-state'
                        onChange={e => setShop_specialty_1(e.target.value)}
                      >
                        <option className='text-gray-600'>choose shop specialty</option>
                        {isLoading ? <h1>loading...</h1>
                          : categories.map((v) => (<option>{v.name}</option>))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <h3 className='block uppercase text-gray-600 text-xs font-bold my-2'>shop specialty 2</h3>
                    <div className=''>
                      <select
                        className='block appearance-none w-full bg-white border text-gray-700 py-3 px-4 pr-8 rounded leading-tight
                        border-gray-700 focus:outline-none focus:border-dark-blue'
                        id='grid-state'
                        onChange={e => setShop_specialty_2(e.target.value)}
                      >
                        <option className='text-gray-600'>choose shop specialty</option>
                        {isLoading ? <h1>loading...</h1>
                          : categories.map((v) => (<option>{v.name}</option>))}
                      </select>
                    </div>
                  </div>
                  <div className='text-center mt-6'>
                    <button
                      className='bg-dark-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-3 rounded shadow hover:shadow-lg
                      outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                      type='button'
                      onClick={e => {
                        e.preventDefault()
                        return createVendor()
                      }}
                    >
                      {isLoading ? 'Loading...' : 'Create'}
                    </button>
                    <p> <Link to={'/admin/users/create-customer'}> Or <span className='text-dark-blue'>Create a Customer</span></Link></p>
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

export default CreateVendor
