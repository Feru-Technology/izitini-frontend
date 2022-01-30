import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { post } from '../../../api/apiAction'
import { Link, useNavigate } from 'react-router-dom'
import { login, loggedIn, loginFailed } from '../../../redux/profile.slice'

const CustomerSignUp = () => {



  // redux
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string | null>(null)
  const [contact, setContact] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [full_name, setFull_name] = useState<string | null>(null)
  const [account_type, setAccount_type] = useState<string | null>(null)

  const signup = () => {
    dispatch(login())
    post(dispatch, loggedIn, loginFailed, '/auth/register', { email, password })
  }

  const navigate = useNavigate()


  return (
    <div>
      <section className='min-h-screen bg-gray-100'>

        <div className='w-full lg:w-5/12 px-4 mx-auto pt-6'>
          <div>
            <h1 className='my-6 flex justify-center'>
              <img
                src='https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Logo1.png'
                className=''
                width='100px'
                height='100px'
                alt='logo'
              />
            </h1>
          </div>
          <div className='relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg bg-white shadow hover:shadow-md ease-linear transition-all duration-150'>
            <div className='rounded-t mb-0 px-6 py-6'>
              <div className='text-center mb-3'>
                <h6 className='text-gray-500 text-sm font-bold'>
                  Sign in with
                </h6>
              </div>
              <div className=' text-center'>
                <button
                  className='bg-white active:bg-gray-50 text-gray-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150'
                  type='button'
                >
                  <img
                    alt='...'
                    className='w-5 mr-1'
                    src='https://givefast.link/wp-content/themes/aiodl-default/assets/sources/facebook.svg'
                  />
                  facebook
                </button>
                <button
                  className='bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150'
                  type='button'
                >
                  <img
                    alt='...'
                    className='w-5 mr-1'
                    src='https://demos.creative-tim.com/notus-js/assets/img/google.svg'
                  />
                  Google
                </button>
                <button
                  className='bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150'
                  type='button'
                >
                  <img
                    alt='...'
                    className='w-5 mr-1'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png'
                  />
                  LinkedIn
                </button>
              </div>
            </div>
            <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
              <div className='text-gray-700 border-bottom border-gray-600 text-center mb-3 font-bold'>
                <small>Or sign in with credentials</small>
              </div>
              <form>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Account Type
                  </label>
                  <select
                    className='block appearance-none w-full bg-white border border-gray-700 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-700'
                    id='grid-state'
                  // onChange={e => setSubCategory(e.target.value)}
                  >
                    <option>Select Account type</option>
                    <option>customer</option>
                    <option>business</option>
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Full Names
                  </label>
                  <input
                    type='email'
                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                    placeholder='Full Names'
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
                    type='number'
                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                    placeholder='Tel'
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
                <div className='text-center mt-6'>
                  <button
                    className='bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                    type='button'
                  >
                    Sign Up
                  </button>
                </div>
                <hr className='text-gray-600 mb-4' />
                <div className='text-right '>
                  <Link to='/signin'><a href='#' className='text-light-blue hover:underline hover:text-middle-blue'>Sign in</a> if already have an account by sign in,I agree to izitini's
                    Terms of use * Privacy Policy</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CustomerSignUp
