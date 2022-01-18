import Header from './Header'
import { useState } from 'react'
import SiderBar from './SiderBar'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { fetch, post } from '../../api/apiAction'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchingSubCategories,
  retrievedSubCategory,
  retrievedSubCategoryFailed
} from '../../redux/subCategories/subCategory.slice'

import {
  fetchingProducts,
  storeProducts,
  productFailed
} from '../../redux/products/storeProducts.slice '

const CreateProduct = () => {

  // redux
  const dispatch = useDispatch();

  const fetchSubcategory = () => {
    dispatch(fetchingSubCategories());
    fetch(dispatch, retrievedSubCategory, retrievedSubCategoryFailed, '/subCategory')
  }

  const { isLoading, subCategories } = useSelector((state: RootState) => state.subCategory);

  if (subCategories.length === 0) fetchSubcategory()

  const [isClosed, setIsClosed] = useState(false)
  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  // add inputs state
  const [name, setName] = useState<string | null>(null)
  const [unit, setUnit] = useState<string | null>(null)
  const [brand, setBrand] = useState<string | null>(null)
  const [price, setPrice] = useState<string | null>(null)
  const [manual, setManual] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<string | null>(null)
  const [subCategory, setSubCategory] = useState<string | null>(null)
  const [specification, setSpecification] = useState<string | null>(null)

  const { store } = useSelector((state: RootState) => state.store);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  const store_id = store?.id

  const createProduct = () => {
    dispatch(fetchingProducts())
    post(
      dispatch,
      storeProducts,
      productFailed, `/product/${store_id}`,
      { name, unit, brand, price, manual, quantity, subCategory, specification },
      token
    )
    navigate('/vendor/products')
  }

  return (

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
        <div className="px-4 sm:px-6  lg:px-8 py-8 w-full h-screen  max-w-9xl mx-auto bg-gray-200">
          <div className="font-bold text-3xl text-center">Create a Product</div>
          <form>
            <div>
              <h3>sub-category</h3>
              <div className="">
                <select
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={e => setSubCategory(e.target.value)}
                >
                  <option>Select Sub-Category</option>
                  {isLoading ? <h1>loading</h1>
                    : subCategories.map((s) => (<option>{s.name}</option>))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                name
              </label>
              <input
                type="text"
                className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                placeholder="name"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className=" w-full mb-3">
              <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Brand
              </label>
              <input
                type="text"
                className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                placeholder="Brand"
                onChange={e => setBrand(e.target.value)}
              />
            </div>
            <div className=" w-full mb-3">
              <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Unit/measurements
              </label>
              <input
                type="text"
                className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                placeholder="Brand"
                onChange={e => setUnit(e.target.value)}
              />
            </div>
            <div className=" w-full mb-3">
              <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Quantity
              </label>
              <input
                type="number"
                className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                placeholder="Quantity"
                onChange={e => setQuantity(e.target.value)}
              />
            </div>
            <div className=" w-full mb-3">
              <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Price per unit
              </label>
              <input
                type="number"
                className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                placeholder="Price unit"
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div className=" w-full mb-3">
              <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Product manual
              </label>
              <input
                type="text"
                className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                placeholder="Product manual"
                onChange={e => setManual(e.target.value)}
              />
            </div>
            <div className=" w-full mb-3">
              <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Product Specifications
              </label>
              <input
                type="text"
                className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                placeholder="Product Specifications"
                onChange={e => setSpecification(e.target.value)}
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
                className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  createProduct()
                }
                }
              >
                create product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
