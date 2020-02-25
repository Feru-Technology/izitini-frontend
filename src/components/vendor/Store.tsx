import {
  useEffect,
  useRef,
  useState
} from 'react'
import Header from './Header'
import SiderBar from './SiderBar'
import { format } from 'date-fns'
import { AiFillCamera } from 'react-icons/ai'
import { RootState } from '../../redux/store'
import axiosAction from '../../api/apiAction'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useStore, updateShop, changeShopImage } from '../../api/stores'

import {
  getStore, store, storeFailed
} from '../../redux/stores/store.slice'
import {
  updatingStore, updated, updateFailed
} from '../../redux/stores/updateStore.slice'

const Store = () => {

  const token = localStorage.getItem('token')

  useAuth('business')

  // redux
  const input = useRef(null)
  const dispatch = useDispatch()

  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  useStore()
  const { isLoading, currentStore, error } = useSelector((state: RootState) => state.store)


  const [isClosed, setIsClosed] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState<string | null>(null)
  const [about_shop, setAbout_shop] = useState<string>('')
  const [shop_email, setShop_email] = useState<string | null>(null)
  const [shop_contact_no, setShop_contact_no] = useState<string | null>(null)



  useEffect(() => {
    if (currentStore) {
      setEditMode(false)
      setName(currentStore.name)
      setShop_email(currentStore.shop_email)
      setAbout_shop(currentStore.about_shop)
      setShop_contact_no(currentStore.shop_contact_no)
    }
  }, [currentStore])

  //@ts-ignore
  const uploadImage = () => input.current.click()

  const { updatedStore } = useSelector((state: RootState) => state.updateStore)

  useEffect(() => {
    if (updatedStore) {
      dispatch(getStore())
      dispatch(updated(null))
      axiosAction('get', dispatch, store, storeFailed, '/shop/mine/all', token)
    }
  })

  return (
    <>
      {isLoading ? 'Loading' :
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

            {/* vendor dashboard */}

            <div className='w-full flex justify-center bg-gray-100 p-5'>
              {currentStore ? (

                <div className='flex flex-col min-w-0 break-words mb-6  rounded-lg w-full md:w-8/12 lg:w-1/2
              bg-white shadow hover:shadow-md ease-linear transition-all duration-150'>
                  <div className='flex my-5 justify-center'>
                    <div className='w-2/5 auto relative'>
                      <img className='w-full h-full rounded-lg'
                        src={currentStore.shop_image_url || 'https://izitini-spaces.fra1.digitaloceanspaces.com/profile-pics/profile.png'} alt='profile' />

                      <input className='absolute hidden' type="file" name="img" ref={input}
                        accept='image/x-png,image/gif,image/jpeg, image/png'
                        onChange={e => {
                          if (e.target.files) changeShopImage(dispatch, currentStore.id, e.target.files[0])
                        }} />

                      <AiFillCamera className='h-7 w-7  text-dark-blue hover:text-light-blue bg-white rounded-full p-0.5 opacity-60 hover:opacity-100
                  absolute bottom-0.5 right-0.5 mr-auto cursor-pointer duration-300' onClick={() => uploadImage()} />
                    </div>
                  </div>

                  <div className='px-2 md:px-7'>
                    <form className='w-full'>
                      <div>
                        <div className=''>
                          <div>
                            <Transition show={!!error}>
                              <div className='border border-red-600 bg-red-100 p-2 flex justify-center text-red-600'>
                                {error?.message}
                              </div>
                            </Transition>
                          </div>

                          <div className='w-full space-y-4'>
                            <div className=''>
                              <label className='block font-semibold text-sm md:text-base text-gray-500 '
                                htmlFor='names'>Name:</label>
                              <input className={`w-full text-sm md:text-base font-medium outline-none border py-3 px-4 rounded
                            border-gray-400 focus:border-dark-blue pointer-events-none text-gray-600
                            ${!editMode ? 'pointer-events-none bg-gray-100 border' : 'pointer-events-auto bg-white'}`}
                                id='grid-first-name' type='text' onChange={e => setName(e.target.value)} defaultValue={name || currentStore.name} />

                            </div>

                            <div className=''>
                              <label className='block font-semibold text-sm md:text-base text-gray-500'
                                htmlFor='contact'>Contact:</label>
                              <input className={`w-full text-sm md:text-base font-medium outline-none border py-3 px-4 rounded
                            border-gray-400 focus:border-dark-blue pointer-events-none text-gray-600
                              ${!editMode ? 'pointer-events-none bg-gray-100 border' : 'pointer-events-auto bg-white'}`}
                                id='grid-last-name' type='text' onChange={e => setShop_contact_no(e.target.value)} defaultValue={shop_contact_no || currentStore.shop_contact_no} />
                            </div>

                            <div className=''>
                              <label className='block font-semibold text-sm md:text-base text-gray-500'
                                htmlFor='Tin no'>About:</label>
                              <input className={`w-full text-sm md:text-base font-medium outline-none border py-3 px-4 rounded
                            border-gray-400 focus:border-dark-blue pointer-events-none text-gray-600
                              ${!editMode ? 'pointer-events-none bg-gray-100 border' : 'pointer-events-auto bg-white'}`}
                                id='grid-last-name' type='text' onChange={e => setAbout_shop(e.target.value)} defaultValue={about_shop || currentStore.about_shop || 'N/A'} />
                            </div>

                            <div className=''>
                              <label className='block font-semibold text-sm md:text-base text-gray-500'
                                htmlFor='email'>Email:</label>
                              <input className={`w-full text-sm md:text-base font-medium outline-none border py-3 px-4 rounded
                            border-gray-400 focus:border-dark-blue pointer-events-none text-gray-600 
                              ${!editMode ? 'pointer-events-none bg-gray-100 border' : 'pointer-events-auto bg-white'}`}
                                id='grid-last-name' type='text' onChange={e => setShop_email(e.target.value)} defaultValue={shop_email || currentStore.shop_email} />
                            </div>

                            {currentStore.shopSpecialties?.map((specialties) => (
                              <div className=''>
                                <label className='block font-semibold text-sm md:text-base text-gray-500'
                                  htmlFor='Specialty type'>Specialty:</label>
                                <input className='w-full mx-4 bg-gray-100 md:mx-0 text-sm md:text-base font-medium border py-3 px-4 rounded
                            border-gray-400 focus:border-dark-blue pointer-events-none'
                                  text-gray-600 id='grid-last-name' type='text'
                                  value={specialties.category.name}
                                />
                              </div>
                            ))}
                            <div className=''>
                              <label className='block font-semibold text-sm md:text-base text-gray-500'
                                htmlFor='Approved'>Approved:</label>
                              <input className='w-full mx-4 bg-gray-100 md:mx-0 text-sm md:text-base font-medium border py-3 px-4 rounded
                            border-gray-400 pointer-events-none text-gray-600'
                                id='grid-last-name' type='text' value={`${currentStore.is_approved}`} />
                            </div>
                            <div className=''>
                              <label className='block font-semibold text-sm md:text-base text-gray-500'
                                htmlFor='created At'>created At:</label>
                              <input className='w-full mx-4 bg-gray-100 md:mx-0 text-sm md:text-base font-medium border py-3 px-4 rounded
                            border-gray-400 pointer-events-none text-gray-600'
                                id='grid-last-name' type='text' value={format(new Date(currentStore.createdAt), 'dd.MM.yyyy')} />
                            </div>
                            <div className=''>
                              <label className='block font-semibold text-sm md:text-base text-gray-500'
                                htmlFor='Updated At'>Updated At:</label>
                              <input className='w-full mx-4 bg-gray-100 md:mx-0 text-sm md:text-base font-medium border py-3 px-4 rounded
                            border-gray-400 pointer-events-none text-gray-600'
                                id='grid-last-name' type='text' value={format(new Date(currentStore.updatedAt), 'dd.MM.yyyy')} />
                            </div>
                          </div>

                        </div>
                      </div>

                      <div className='flex justify-center my-5 '>
                        <Transition className='flex space-x-6'
                          show={!!editMode}
                        >
                          <button className='py-3 px-6 bg-dark-blue rounded-md text-white text-sm md:text-base font-semibold'
                            onClick={e => {
                              e.preventDefault()
                              // dispatch()
                              return setEditMode(false)
                            }} >
                            CANCEL
                          </button>
                          <button className='py-3 px-6 bg-dark-blue rounded-md text-white text-sm md:text-base font-semibold'
                            onClick={e => {
                              e.preventDefault()
                              return updateShop(dispatch, currentStore.id, { about_shop, shop_contact_no, shop_email, name })
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
              ) : <div className='mt-24 ml-24 font-bold text-base'>{error?.message}</div>
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Store
