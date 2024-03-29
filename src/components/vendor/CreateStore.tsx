import { useState } from 'react'
import Header from './Header'
import SiderBar from './SiderBar'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { createStore } from '../../api/stores'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import { useCategories } from '../../api/categories'
import { useDispatch, useSelector } from 'react-redux'

const CreateStore = () => {

  useAuth('business')

  const [isClosed, setIsClosed] = useState(true)
  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  // redux
  const dispatch = useDispatch()

  useCategories()
  const { isLoading, categories } = useSelector((state: RootState) => state.AllCategories)

  const [category, setCategory] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [about_shop, setAbout_shop] = useState<string | null>(null)
  const [shop_email, setShop_email] = useState<string | null>(null)
  const [shop_contact_no, setShop_contact_no] = useState<string | null>(null)



  const { currentStore, error } = useSelector((state: RootState) => state.store)


  const isLoggingIn = useSelector((state: RootState) => state.profile.isLoading)

  return (
    <>
      {isLoggingIn ? 'Loading ...' :
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
            <div className="px-4 sm:px-6  lg:px-8 py-8 w-full h-screen  max-w-9xl mx-auto bg-slate-200">
              <div className="font-bold text-3xl text-center">Create a new Store</div>
              <div className='container'>
                <Transition
                  show={!!error}
                >
                  {/* {error ? } */}
                  <p className='w-full py-1  text-red-700 text-center '>{error?.message}</p>

                </Transition>
                <Transition
                  show={!!currentStore}
                >
                  <p className='w-full py-1 text-[#00adef] text-center'>Store created successfully</p>

                </Transition>
              </div>
              <form>
                <div>
                  <h3>Select Category</h3>
                  <div className="">
                    <select
                      className="block appearance-none w-full bg-white border border-slate-200 text-slate-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                      id="grid-state"
                      onChange={e => setCategory(e.target.value)}
                    >
                      <option>Select Category</option>
                      {isLoading ? <h1>loading...</h1>
                        : categories.map((v) => (<option>{v.name}</option>))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className=" w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-text"
                  >
                    Name
                  </label>
                  <input
                    type="email"
                    className="border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                    placeholder="Name"
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className=" w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-text"
                  >
                    About Store
                  </label>
                  <input
                    type="text"
                    className="border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                    placeholder="About Store"
                    onChange={e => setAbout_shop(e.target.value)}
                  />
                </div>
                <div className=" w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-text"
                  >
                    Store Email
                  </label>
                  <input
                    type="text"
                    className="border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                    placeholder="Store Email"
                    onChange={e => setShop_email(e.target.value)}
                  />
                </div>
                <div className=" w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-number"
                  >
                    Store Contact
                  </label>
                  <input
                    type="text"
                    className="border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600
                bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                    placeholder="Store Contact"
                    onChange={e => setShop_contact_no(e.target.value)}
                  />
                </div>

                {/* upload image */}
                <div>
                  <form action="/action_page.php">
                    <input type="file" id="myFile" name="filename" />
                  </form>
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-[#00adef] text-white active:bg-slate-600 text-sm font-bold uppercase mb-4px-6 py-3
                rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      createStore(dispatch, { category, name, about_shop, shop_email, shop_contact_no })
                    }}
                  >
                    create store
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default CreateStore
