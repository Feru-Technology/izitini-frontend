import { useEffect, useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { post } from '../../api/apiAction'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { addStore, getStore, storeFailed } from '../../redux/stores/createStore.slice'

import {
  fetchingCategories,
  retrievedCategory,
  retrievedCategoryFailed
} from '../../redux/categories/categories.slice'

import {
  fetchingUsers,
  retrievedUsers,
  retrievedUserFailed
} from '../../redux/admin/users/users.slice'

const CreateProduct = () => {

  const [isClosed, setIsClosed] = useState(false)
  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  // redux
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  // get all vendors without shops
  useEffect(() => {
    dispatch(fetchingUsers())
    fetch(dispatch, retrievedUsers, retrievedUserFailed, '/admin/user/vendor-without-shop', token)
  }, [dispatch, token])

  // get all categories
  useEffect(() => {
    dispatch(fetchingCategories())
    fetch(dispatch, retrievedCategory, retrievedCategoryFailed, '/admin/category')
  }, [dispatch])


  const { users } = useSelector((state: RootState) => state.users)

  const { isLoading, categories } = useSelector((state: RootState) => state.categories)

  const [name, setName] = useState<string | null>(null)
  const [owner, setOwner] = useState<string | null>(null)
  const [about_shop, setAbout_shop] = useState<string | null>(null)
  const [shop_email, setShop_email] = useState<string | null>(null)
  const [shop_contact_no, setShop_contact_no] = useState<string | null>(null)
  const [shop_specialty_1, setShop_specialty_1] = useState<string | null>(null)
  const [shop_specialty_2, setShop_specialty_2] = useState<string | null>(null)

  const createStore = () => {
    dispatch(addStore())
    post(
      dispatch,
      getStore,
      storeFailed, '/admin/shop',
      { shop_specialty_1, shop_specialty_2, name, about_shop, shop_email, shop_contact_no, owner },
      token
    )
  }

  const navigate = useNavigate()

  const { createdStore, error } = useSelector((state: RootState) => state.createStore)

  useEffect(() => {
    if (createdStore) {
      const { id } = createdStore
      dispatch(getStore(null))
      return navigate(`/admin/shop/${id}`)
    }
  }, [createdStore, dispatch, navigate])


  return (
    <div className='flex h-screen overflow-hidden bg-gray-100 '>
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
          name={'Vendor'}
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
        <div className='px-4 sm:w-5/6 md:w-4/6 lg:3/6 flex mx-auto '>
          <div className=' my-8 w-full h-auto bg-white shadow-md px-4 rounded-md py-4'>
            <div className='mb-6 font-bold text-lg md:text-xl lg:text-2xl text-center'>Create Store</div>
            <div className='container'>
              <Transition
                show={!!error}
              >
                {/* {error ? } */}
                <p className='w-full py-1  text-red-700 text-center '>{error?.message}</p>

              </Transition>
            </div>
            <form>
              <div className=' w-full mb-3'>
                <h3 className='block uppercase text-gray-600 text-xs font-bold mb-2'>Assign User to this shop</h3>
                <div className=' w-full mb-3'>
                  <select
                    className='block appearance-none w-full bg-white border text-gray-700 py-3 px-4 pr-8 rounded border-gray-500'
                    id='grid-state'
                    onChange={e => setOwner(e.target.value)}
                  >
                    <option>Choose Shop Owner</option>
                    {isLoading ? <h1>loading...</h1>
                      : users.map((u) => (<option value={u.id}>{u.full_name}</option>))}
                  </select>
                </div>
              </div>
              <div className=' w-full mb-3'>
                <h3 className='block uppercase text-gray-600 text-xs font-bold mb-2'>Shop Specialty 1</h3>
                <div className=' w-full mb-3'>
                  <select
                    className='block appearance-none w-full bg-white border text-gray-700 py-3 px-4 pr-8 rounded border-gray-500'
                    id='grid-state'
                    onChange={e => setShop_specialty_1(e.target.value)}
                  >
                    <option>Choose Shop Specialty</option>
                    {isLoading ? <h1>loading...</h1>
                      : categories.map((c) => (<option>{c.name}</option>))}
                  </select>
                </div>
              </div>
              <div className=' w-full mb-3'>
                <h3 className='block uppercase text-gray-600 text-xs font-bold mb-2'>Shop Specialty 2</h3>
                <div className=' w-full mb-3'>
                  <select
                    className='block appearance-none w-full bg-white border text-gray-700 py-3 px-4 pr-8 rounded border-gray-500'
                    id='grid-state'
                    onChange={e => setShop_specialty_2(e.target.value)}
                  >
                    <option>Choose Shop Specialty</option>
                    {isLoading ? <h1>loading...</h1>
                      : categories.map((c) => (<option>{c.name}</option>))}
                  </select>
                </div>
              </div>
              <div className=' w-full mb-3'>
                <label
                  className='block uppercase text-gray-600 text-xs font-bold mb-2'
                  htmlFor='grid-text'
                >
                  Name
                </label>
                <input
                  type='email'
                  className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                  placeholder='Name'
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className=' w-full mb-3'>
                <label
                  className='block uppercase text-gray-600 text-xs font-bold mb-2'
                  htmlFor='grid-text'
                >
                  About Store
                </label>
                <input
                  type='text'
                  className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                  placeholder='About Store'
                  onChange={e => setAbout_shop(e.target.value)}
                />
              </div>
              <div className=' w-full mb-3'>
                <label
                  className='block uppercase text-gray-600 text-xs font-bold mb-2'
                  htmlFor='grid-text'
                >
                  Store Email
                </label>
                <input
                  type='text'
                  className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                  placeholder='Store Email'
                  onChange={e => setShop_email(e.target.value)}
                />
              </div>
              <div className=' w-full mb-3'>
                <label
                  className='block uppercase text-gray-600 text-xs font-bold mb-2'
                  htmlFor='grid-number'
                >
                  Store Contact
                </label>
                <input
                  type='text'
                  className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600
                bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                  placeholder='Store Contact'
                  onChange={e => setShop_contact_no(e.target.value)}
                />
              </div>

              {/* upload image */}
              <div>
                <form action='/action_page.php'>
                  <input type='file' id='myFile' name='filename' />
                </form>
              </div>
              <div className='text-center mt-6'>
                <button
                  className='bg-dark-blue text-white active:bg-gray-600 text-sm font-bold uppercase px-6 p-3
                rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault()
                    createStore()
                  }}
                >
                  create store
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreateProduct
