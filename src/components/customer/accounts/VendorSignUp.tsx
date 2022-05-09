import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { RootState } from '../../../redux/store'
import { post, fetch } from '../../../api/apiAction'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, loggedIn, loginFailed } from '../../../redux/profile.slice'
import { fetchingCategories, retrievedCategory, retrievedCategoryFailed } from '../../../redux/categories/categories.slice'

const VendorSignUp = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchingCategories())
    fetch(dispatch, retrievedCategory, retrievedCategoryFailed, '/admin/category')
  }, [dispatch])

  const { isLoading, categories } = useSelector((state: RootState) => state.categories)

  const [name, setName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [contact, setContact] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [full_name, setFull_name] = useState<string | null>(null)
  const [about_shop, setAbout_shop] = useState<string | null>(null)
  const [shop_specialty_1, setShop_specialty_1] = useState<string | null>(null)
  const [shop_specialty_2, setShop_specialty_2] = useState<string | null>(null)

  const navigate = useNavigate()

  const signup = () => {
    dispatch(login())
    post(dispatch, loggedIn, loginFailed, '/auth/register-vendor', {
      name,
      email,
      contact,
      password,
      full_name,
      about_shop,
      category1: shop_specialty_1,
      category2: shop_specialty_2
    })
  }

  const { profile, loginSignupError } = useSelector((state: RootState) => state.profile)

  if (profile) navigate('/')

  return (
    <div>
      <section className='min-h-screen bg-gray-100'>

        <div className='w-full lg:w-5/12 px-4 mx-auto pt-6'>
          <div>
            <h1 className='my-6 flex justify-center'>
              <Link to={'/'}>
                <img
                  src='https://izitini-spaces.fra1.digitaloceanspaces.com/system-images/Logo1.png'
                  className=''
                  width='100px'
                  height='100px'
                  alt='logo'
                />
              </Link>
            </h1>
          </div>
          <div className='relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg bg-white shadow hover:shadow-md ease-linear transition-all duration-150'>

            <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
              <div className='text-gray-700 border-bottom border-gray-600 text-center mb-3 font-bold'>
                <p className='my-5'>Join as vendor</p>
              </div>
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
                    placeholder='Full Name'
                    onChange={e => setFull_name(e.target.value)}
                  />
                </div>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Shop Name
                  </label>
                  <input
                    type='text'
                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                    placeholder='Shop Name'
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    About Shop
                  </label>
                  <input
                    type='text'
                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                    placeholder='About Shop'
                    onChange={e => setAbout_shop(e.target.value)}
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
                    placeholder='contact number'
                    onChange={e => setContact(e.target.value)}
                  />
                </div>
                <div className='relative w-full mb-3'>
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

                <div className='relative w-full mb-3'>
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
                    show={!!loginSignupError}
                  >
                    <p className='w-full py-1  text-red-700 text-center'>{loginSignupError?.message}</p>

                  </Transition>
                </div>
                <div className='text-center mt-6'>
                  <button
                    className='bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => signup()}
                  >
                    Sign Up
                  </button>
                </div>
                <hr className='text-gray-600 mb-4' />
                <div className='text-right'>
                  <p className='font-normal'>
                    <span className='text-gray-800'> Already have an account ? </span>
                    <Link to='/signin' className='text-light-blue hover:underline hover:text-middle-blue'>Sign in</Link> </p>

                  <p className='font-light'>By sign in,I agree to izitini's Terms of use and  Privacy Policy</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VendorSignUp
