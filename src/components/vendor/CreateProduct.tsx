import Header from './Header'
import { useState, useEffect } from 'react';
import SiderBar from './SiderBar'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { fetch, post } from '../../api/apiAction'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchingSubCategories,
  retrievedSubCategory,
  retrievedSubCategoryFailed
} from '../../redux/subCategories/subCategory.slice'
import {
  getProduct,
  product,
  productFailed
} from '../../redux/products/product.slice'

const CreateProduct = () => {

  // redux
  const dispatch = useDispatch()

  const fetchSubcategory = () => {
    dispatch(fetchingSubCategories())
    fetch(dispatch, retrievedSubCategory, retrievedSubCategoryFailed, '/subCategory')
  }

  const { isLoading, subCategories } = useSelector((state: RootState) => state.subCategory)

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

  // set progress level
  const [level1, setLevel1] = useState(false)
  const [level2, setLevel2] = useState(true)
  const [level3, setLevel3] = useState(false)

  // set errors
  const [isError, setIsError] = useState(false)

  const { currentStore } = useSelector((state: RootState) => state.store)
  const token = localStorage.getItem('token')

  const store_id = currentStore?.id


  // create product product
  const createProduct = () => {
    if (name && unit && brand) {
      setIsError(true)
      dispatch(getProduct())
      post(
        dispatch,
        product,
        productFailed, `/product/${store_id}`,
        { name, unit, brand, subCategory },
        token
      )
    }
  }
  const { currentProduct, error } = useSelector((state: RootState) => state.product)

  useEffect(() => {
    if (currentProduct) {
      setLevel2(true)
      setLevel1(false)
      setLevel3(false)
    }
  }, [currentProduct])

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
        <div className="px-4 sm:px-6  lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="font-bold text-3xl text-center ">Add a Product</div>
          <div className='my-5 flex list-none md:w-4/6 lg:w-3/6 mx-auto'>
            <ol className='flex list-none w-full text-gray-600'>
              <li className={`bg-gray-300 h-1 w-1/3 ${(level1 || level2 || level3) && 'bg-light-blue'}`} />
              <li className={`bg-gray-300 -mt-1 h-3 w-3 text-xs rounded-full border-2 border-gray-300
              ${(level1 || level2 || level3) && 'border-light-blue bg-light-blue'}`} />
              <li className={`bg-gray-300 h-1 w-1/3 ${(level2 || level3) && 'bg-light-blue'}`} />
              <li className={`bg-gray-300 -mt-1 h-3 w-3 text-xs rounded-full border-2 border-gray-300
              ${(level2 || level3) && 'border-light-blue bg-light-blue'}`} />
              <li className={`bg-gray-300 h-1 w-1/3 ${level3 && 'bg-light-blue'}`} />
              <li className={`bg-gray-300 -mt-1 h-3 w-3 text-xs rounded-full border-2 border-gray-300
              ${level3 && 'border-light-blue bg-light-blue'}`} />
            </ol>
          </div>
          <form className='md:w-4/6 lg:w-3/6 mx-auto'>
            <div>
              <Transition
                show={!!error}
              >
                <p className='w-full py-1  text-red-600 text-center border-2 border-red-100 bg-red-50 px-2'>{error?.message}</p>

              </Transition>
              <Transition
                show={!!currentProduct}
              >
                <p className='w-full py-1 text-light-blue text-center'>success</p>

              </Transition>
            </div>

            <Transition show={level1}>
              <div className='mb-5'>
                <label
                  className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="text"
                >
                  sub-category
                </label>
                <div className='mb-5'>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-200 text-gray-700
                  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    onChange={e => setSubCategory(e.target.value)}
                  >
                    <option>Select Sub-Category</option>
                    {isLoading ? <h1>loading</h1>
                      : subCategories.map((s) => (<option>{s.name}</option>))}
                  </select>
                  {subCategory === null ? <span className={`sr-only text-xs text-red-600 flex justify-center
                  ${isError && 'not-sr-only mt-1 font-light absolute'}`}>Please select subCategory</span> : ''}
                </div>
              </div>
              <div className='mb-5'>
                <label
                  className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="text"
                >
                  name
                </label>
                <input
                  type="text"
                  className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                  placeholder="name"
                  onChange={e => setName(e.target.value)}
                />
                {name === null ? <span className={`sr-only text-xs text-red-600 flex justify-center
                ${isError && 'not-sr-only mt-1 font-light absolute'}`}>Please Provide product name</span> : ''}
              </div>
              <div className='mb-5'>
                <label
                  className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="text"
                >
                  Brand
                </label>
                <input
                  type="text"
                  className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                  placeholder="Brand"
                  onChange={e => setBrand(e.target.value)}
                />
                {brand === null ? <span className={`sr-only text-xs text-red-600 flex justify-center
                ${isError && 'not-sr-only mt-1 font-light absolute'}`}>Please Provide product brand</span> : ''}
              </div>
              <div className='mb-5'>
                <label
                  className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="text"
                >
                  Unit/measurements
                </label>
                <input
                  type="text"
                  className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                  placeholder="Brand"
                  onChange={e => setUnit(e.target.value)}
                />
                {unit === null ? <span className={`sr-only text-xs text-red-600 flex justify-center
                ${isError && 'not-sr-only mt-1 font-light absolute'}`}>Please Provide product unit</span> : ''}
              </div>
            </Transition>
            <Transition show={level2}>

              {/* product sizes */}
              <div>
                <div className="mb-3">
                  <input type="checkbox" name="size" value="sizes"
                    className="mr-3 transition-all duration-150"
                    onChange={e => setPrice(e.target.value)}
                  />
                  <label htmlFor="Product has multiple sizes"
                    className='text-gray-700 font-normal' >
                    I have this product in multiple sizes
                  </label>
                </div>

              </div>

              {/* product colors */}
              <div>
                <div className="mb-3">
                  <input type="checkbox" name="color" value="colors"
                    className="mr-3 transition-all duration-150"
                    onChange={e => setPrice(e.target.value)}
                  />
                  <label htmlFor="Product has multiple colors"
                    className='text-gray-700 font-normal' >
                    I have this product in multiple colors
                  </label>
                </div>

              </div>
              {/* <div className=" w-full mb-3">
                <label
                  className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="text"
                >
                  Price per unit
                </label>
                <input
                  type="number"
                  className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                  placeholder="Price unit"
                  onChange={e => setPrice(e.target.value)}
                />
              </div>

              <div className=" w-full mb-3">
                <label
                  className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="text"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                  placeholder="Quantity"
                  onChange={e => setQuantity(e.target.value)}
                />
              </div> */}

              {/* upload image */}
              {/* <div>
                <form action="/action_page.php">
                  <input type="file" id="myFile" name="filename" />
                </form>
              </div> */}
            </Transition>
            <Transition show={level3}>
              <div className=" w-full mb-3">
                <label
                  className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="text"
                >
                  Product manual
                </label>
                <input
                  type="text"
                  className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                  placeholder="Product manual"
                  onChange={e => setManual(e.target.value)}
                />
              </div>
              <div className=" w-full mb-3">
                <label
                  className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="text"
                >
                  Product Specifications
                </label>
                <input
                  type="text"
                  className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                  placeholder="Product Specifications"
                  onChange={e => setSpecification(e.target.value)}
                />
              </div>
            </Transition>

            {/* buttons */}
            <div className="text-center mt-3 space-x-4">

              <Transition show={level1}>
                <button
                  className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-2
                rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150
                right-0"
                  type="button"
                  onClick={(e) => {
                    createProduct()
                    e.preventDefault()
                  }}>
                  Continue
                </button>
              </Transition>

              <Transition show={level2}>
                <button
                  className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-2
                rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150
                right-0"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    createProduct()
                    setLevel1(true)
                    setLevel2(false)
                    setLevel3(false)
                  }}>
                  Previous
                </button>
                <button
                  className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-2
                  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 right-0"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    createProduct()
                    setLevel3(true)
                    setLevel1(false)
                    setLevel2(false)
                  }}>
                  Continue
                </button>
              </Transition>

              <Transition show={level3}>
                <button
                  className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-2
                rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150
                right-0"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    createProduct()
                    setLevel2(true)
                    setLevel1(false)
                    setLevel3(false)
                  }}>
                  Previous
                </button>
                <button
                  className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-2
                rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150
                right-0"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    createProduct()
                  }
                  }
                >
                  Finish
                </button>
              </Transition>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

export default CreateProduct
