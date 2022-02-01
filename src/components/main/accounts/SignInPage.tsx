import { useState } from 'react'
import { Link } from "react-router-dom"
import { post } from '../../../api/apiAction'
import { useNavigate } from "react-router-dom"
import { RootState } from '../../../redux/store'
import { Transition } from '@headlessui/react'

import {
  useDispatch, useSelector
} from 'react-redux'

import {
  login,
  loggedIn,
  loginFailed
} from '../../../redux/profile.slice'
const SignInPage = () => {

  // redux
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)

  const { profile, error } = useSelector((state: RootState) => state.profile)

  const loginF = () => {
    dispatch(login())
    post(dispatch, loggedIn, loginFailed, '/auth/login', { email, password })

    if (profile) navigate('/')
  }

  const navigate = useNavigate()

  return (
    <div>
      <body>
        <section className="min-h-screen flex items-stretch text-white ">
          <div
            className="lg:flex w-1/2 hidden bg-gray-100 bg-no-repeat bg-cover relative items-center"
            style={{
              backgroundImage: `url(https://media.istockphoto.com/photos/making-paper-blueprints-a-thing-of-the-past-picture-id1297780275?b=1&k=20&m=1297780275&s=170667a&w=0&h=tMhMWqPqWRJzj8AtIN3uag7FWoo6gyOqCuv5KagPmKI=)`,
            }}
          >
            <div className="absolute bg-black opacity-70 inset-0 z-0"></div>
            <div className="w-full px-24 z-10">
              <h1 className="text-5xl font-bold text-left tracking-wide">
                buy anything and sell anything
              </h1>
              <p className="text-xl my-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex items-center justify-center text-center bg-gray-100 md:px-16 px-4 z-0">
            <div className="py-6 px-1 z-20 mx-auto">
              <h1 className="my-6 inline-flex justify-center">
                <Link to="/">
                  <img
                    src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Logo1.png"
                    className="text-center"
                    width="100px"
                    height="100px"
                    alt="logo"
                  />
                </Link>
              </h1>
              <div className="">
                <div className="flex py-4 justify-center items-center gap-3">
                  <Link to=""
                    className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center justify-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      style={{ fill: "#000000" }}
                    >
                      <path
                        fill="#039be5"
                        d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                      ></path>
                    </svg>
                  </Link>
                  <Link to=""
                    className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center justify-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      style={{ fill: "#000000" }}
                    >
                      <path
                        fill="#fbc02d"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#e53935"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4caf50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1565c0"
                        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                  </Link>
                  <Link to=""
                    className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center justify-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      style={{ fill: "#000000" }}
                    >
                      <path
                        fill="#0288D1"
                        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                      ></path>
                      <path
                        fill="#FFF"
                        d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                      ></path>
                    </svg>
                  </Link>
                </div>
                <div>
                </div>
                <div className="flex justify-center">
                  <hr />
                  <p className="text-gray-900 mb-2">
                    Login
                  </p>
                  <hr />
                </div>
                <form
                  action=""
                  className=" w-full px-4 space-y-3 mx-auto text-gray-900 "
                >
                  <div className="pb-2 pt-4">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="border border-gray-700 px-3 py-3
                      placeholder-gray-500 text-gray-600 bg-white
                      rounded text-sm  focus:outline-none w-full ease-linear
                      transition-all duration-150"
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="pb-2 pt-4">
                    <input
                      className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <div>

                    <Transition
                      show={!!error}
                    >
                      <p className='w-full py-1  text-red-700 text-center '>{error?.message}</p>

                    </Transition>
                  </div>
                  <div className="text-right text-light-blue hover:underline hover:text-middle-blue">
                    <a href="#">Forgot your password?</a>
                  </div>

                  <div className="">
                    <button className="uppercase  w-full p-2
                    text-white  text-lg rounded-lg
                    bg-light-blue hover:bg-middle-blue
                    focus:outline-none"
                      onClick={(e) => {
                        e.preventDefault()
                        loginF()
                      }}
                    >
                      sign in
                    </button>
                  </div>
                  <div>
                    By continuing, you agree to Izitini's Terms and Conditions
                    of Use and Privacy Notice. New
                    <Link to="/signup">
                      <span className="text-right text-light-blue hover:underline hover:text-middle-blue">
                        Sign Up
                      </span>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </body>
    </div>
  )
}

export default SignInPage
