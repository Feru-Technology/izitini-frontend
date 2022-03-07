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
  const [level2, setLevel2] = useState(false)
  const [level3, setLevel3] = useState(true)
  const [level4, setLevel4] = useState(false)

  // set errors
  const [isError, setIsError] = useState(false)

  // product sizes
  const [hasSizes, setHasSizes] = useState(false)
  const [sizePrice, setSizePrice] = useState(false)

  // product Colors
  const [hasColors, setHasColors] = useState(false)
  const [colorPrice, setColorPrice] = useState(false)

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

          {/* progess bar */}
          <div className='my-5 flex list-none md:w-4/6 lg:w-3/6 mx-auto'>
            <ol className='flex list-none w-full text-gray-600'>

              {/* level 1 */}
              <li className={`bg-gray-300 h-1 w-1/3 ${(level1 || level2 || level3 || level4) && 'bg-light-blue'}`} />
              <li className={`bg-gray-300 -mt-1 h-3 w-3 text-xs rounded-full border-2 border-gray-300
              ${(level1 || level2 || level3 || level4) && 'border-light-blue bg-light-blue'}`} />

              {/* level 2 */}
              <li className={`bg-gray-300 h-1 w-1/3 ${(level2 || level3 || level4) && 'bg-light-blue'}`} />
              <li className={`bg-gray-300 -mt-1 h-3 w-3 text-xs rounded-full border-2 border-gray-300
              ${(level2 || level3 || level4) && 'border-light-blue bg-light-blue'}`} />

              {/* level 3 */}
              <li className={`bg-gray-300 h-1 w-1/3 ${(level3 || level4) && 'bg-light-blue'}`} />
              <li className={`bg-gray-300 -mt-1 h-3 w-3 text-xs rounded-full border-2 border-gray-300
              ${(level3 || level4) && 'border-light-blue bg-light-blue'}`} />

              {/* level 4 */}
              <li className={`bg-gray-300 h-1 w-1/3 ${level4 && 'bg-light-blue'}`} />
              <li className={`bg-gray-300 -mt-1 h-3 w-3 text-xs rounded-full border-2 border-gray-300
              ${level4 && 'border-light-blue bg-light-blue'}`} />
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

                {/* as if product has multiple sizes */}
                <Transition show={!hasSizes}>
                  <div className="mb-3">
                    <p className='text-center font-normal'>I have this product in multiple sizes</p>

                    <div className='flex justify-center mt-5 space-x-5'>
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
                        No
                      </button>
                      <button
                        className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-2
                rounded shadow hover:shadow-lg mr-1 ease-linear transition-all duration-150
                right-0"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setHasSizes(true)
                        }}>
                        yes
                      </button>
                    </div>
                  </div>

                </Transition>

                {/* size inputs */}
                <Transition show={hasSizes}>

                  <div className=" w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="size"
                    >
                      Size
                    </label>
                    <input
                      type="size"
                      className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                      placeholder="Size"
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
                  </div>

                  {/* add price per size */}
                  <div className="mb-3">
                    <input type="checkbox" name="size" value="sizes"
                      className="mr-3 transition-all duration-150"
                      onChange={e => e.target.checked ? setSizePrice(true) : setSizePrice(false)}
                    />
                    <label htmlFor="Product has multiple sizes"
                      className='text-gray-700 font-normal' >
                      This size has deferent price
                    </label>
                  </div>

                  <Transition show={sizePrice}>
                    <div className=" w-full mb-3">
                      <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="price"
                      >
                        Price per unit
                      </label>
                      <input
                        type="number"
                        className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                        placeholder="price per size"
                        onChange={e => setPrice(e.target.value)}
                      />
                    </div>
                  </Transition>

                  {/* buttons */}
                  <div>

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
                  </div>

                </Transition>

              </div>

            </Transition>
            <Transition show={level3}>

              {/* product color */}
              <div>

                {/* as if product has multiple color */}
                <Transition show={!hasColors}>
                  <div className="mb-3">
                    <p className='text-center font-normal'>I have this product in multiple colors</p>

                    <div className='flex justify-center mt-5 space-x-5'>
                      <button
                        className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-2
                  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 right-0"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          createProduct()
                          setLevel4(true)
                          setLevel1(false)
                          setLevel2(false)
                          setLevel3(false)
                        }}>
                        No
                      </button>
                      <button
                        className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-2
                rounded shadow hover:shadow-lg mr-1 ease-linear transition-all duration-150
                right-0"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setHasColors(true)
                        }}>
                        yes
                      </button>
                    </div>
                  </div>

                </Transition>

                {/* color inputs */}
                <Transition show={hasColors}>

                  <div className=" w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="color"
                    >
                      color
                    </label>
                    <input
                      type="text"
                      className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                      placeholder="color"
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
                  </div>

                  {/* add price per color */}
                  <div className="mb-3">
                    <input type="checkbox" name="color" value="colors"
                      className="mr-3 transition-all duration-150"
                      onChange={e => e.target.checked ? setColorPrice(true) : setColorPrice(false)}
                    />
                    <label htmlFor="Product has multiple color"
                      className='text-gray-700 font-normal' >
                      This color has deferent price
                    </label>
                  </div>

                  <Transition show={colorPrice}>
                    <div className=" w-full mb-3">
                      <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="price"
                      >
                        Price per unit
                      </label>
                      <input
                        type="number"
                        className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
                        placeholder="price per color"
                        onChange={e => setPrice(e.target.value)}
                      />
                    </div>
                  </Transition>

                  {/* buttons */}
                  <div>
                    <button
                      className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-2
                rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150
                right-0"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        setLevel2(true)
                        setLevel1(false)
                        setLevel3(false)
                        setLevel4(false)
                      }}>
                      Previous
                    </button>
                    <button
                      className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-2
                  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 right-0"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        setLevel4(true)
                        setLevel3(false)
                        setLevel2(false)
                        setLevel1(false)
                      }}>
                      Continue
                    </button>
                  </div>

                </Transition>

              </div>

            </Transition>
            <Transition show={level4}>
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

              <Transition show={level4}>
                <button
                  className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-2
                rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150
                right-0"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    createProduct()
                    setLevel3(true)
                    setLevel4(false)
                    setLevel2(false)
                    setLevel1(false)
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
