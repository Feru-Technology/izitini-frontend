import { Navbar } from './navbar'
import { Footer } from './footer'
import { RootState } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { MdOutlineCancel } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { remove, increaseQty, reduceQty, checkOut } from '../../api/orders'

const lodash = require('lodash')
const Cart = () => {

    // redux
    const dispatch = useDispatch()

    const { isLoading, cart } = useSelector((state: RootState) => state.cart)

    let totalPrices: any = []

    const subTotal = (totals: []) => {
        return lodash.sum(totals)
    }

    const navigate = useNavigate()

    let order: {}[] = []

    return (
        <div className='bg-slate-100'>
            <Navbar />

            {isLoading ? (<div>loading ...</div>)
                : cart.length !== 0 ? cart.map((orders: any) => (

                    <div className='h-full min-h-36'
                    // style={{'min'}}
                    >
                        <div className='mx-3 my-3
                                md:flex md:mx-2 md:my-5  md:space-x-3 md:y-3
                                lg:mx-8 lg:space-x-5 relative'>
                            <div className='w-full md:w-2/3'>
                                <p className='font-semibold text-xl text-center p-3 md:p-5'>Your cart</p>

                                {orders.map((items: any) => {

                                    let totalPricesPerOrder: any = []

                                    const totalPrice = (price: number, quantity: string) => {
                                        const total = price * parseInt(quantity)
                                        totalPricesPerOrder.push(total)
                                        totalPrices.push(total)
                                        return total
                                    }
                                    return (
                                        <div>
                                            <table className='min-w-full divide-y divide-slate-200'>
                                                <thead className='bg-white'>
                                                    <tr className=''>
                                                        <th
                                                            scope='col'
                                                            className='px-3 font-semibold text-slate-700
                                                md:px-6 text-xs md:text-sm
                                                lg:px-6 py-3 text-left lg:text-base'
                                                        >
                                                            Product
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='font-semibold text-slate-700
                                                md:px-6 text-xs md:text-sm
                                                lg:px-6 py-3 text-left lg:text-base
                                    '
                                                        >
                                                            Price
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='font-semibold text-slate-700
                                                md:px-6 text-xs md:text-sm
                                                lg:px-6 py-3 text-left lg:text-base'
                                                        >
                                                            Quality
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='font-semibold text-slate-700
                                                md:px-6 text-xs md:text-sm
                                                lg:px-6 py-3 text-left lg:text-base'
                                                        >
                                                            Total
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='relative md:px-6 lg:px-6 py-3'
                                                        >
                                                            <span className='sr-only'>
                                                                Edit
                                                            </span>
                                                        </th>
                                                    </tr>
                                                </thead>

                                                {items.order_items.map((item: any) => {
                                                    order.push(item)
                                                    return (

                                                        <tbody className='bg-white'>
                                                            <tr
                                                            >
                                                                <td className='px-3 md:px-6 py-4'>
                                                                    <div className='flex items-center'>
                                                                        <div className='flex-shrink-0 w-1/3'>
                                                                            <img
                                                                                className='h-8 w-full md:h-10 lg:h-16'
                                                                                src={item.product.display_image}
                                                                                alt=''
                                                                            />
                                                                        </div>
                                                                        <div className='ml-4 text-xs md:text-sm lg:text-base font-medium text-slate-800 p-2'>
                                                                            {item.product.name}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-xs md:text-sm lg:text-base font-medium text-slate-800
                                                                md:px-6 lg:px-6 py-4'>
                                                                    {item.product.price} RWF</td>
                                                                <td className='py-4 text-xs md:text-sm text-slate-800
                                                                md:px-6 lg:px-6'>
                                                                    <div className='rounded-full border-2 border-slate-400 w-16 md:w-20 lg:w-28'>
                                                                        <div className='flex justify-center md:py-1 text-xs md:text-sm lg:text-base'>
                                                                            <button className='font-medium text-slate-400 hover:text-[#004896]'
                                                                                onClick={() => increaseQty(dispatch, item.order_id, item.product_id)} >+</button>
                                                                            <span className='mx-3 md:mx-3 lg:mx-6 font-medium'>
                                                                                {item.quantity}
                                                                            </span>
                                                                            <button className='font-medium text-slate-400 hover:text-[#004896]'
                                                                                onClick={() => reduceQty(dispatch, item.order_id, item.product_id)} >-</button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-xs md:text-sm lg:text-base font-medium text-slate-800
                                                                md:px-6 lg:px-6 py-4'>
                                                                    {totalPrice(item.product.price, item.quantity)} RWF
                                                                </td>
                                                                <td className='px-2 md:px-3 lg:px-6 py-4 text-right text-base font-medium'>
                                                                    <button type='button'
                                                                        className='text-[#004896] hover:text-red-600'
                                                                        onClick={() => remove(dispatch, item.order_id, item.product_id)}
                                                                    >
                                                                        <MdOutlineCancel className='w-6 h-auto' />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>

                                                    )
                                                }

                                                )}

                                            </table>

                                            <div className='flex border border-slate-200 bg-white mb-4 p-3 font-light text-xs space-x-3
                                            md:text-sm lg:text-base'>
                                                <p className='w-2/6 flex'>Vendor: <span className='ml-1 text-slate-500'>{items.shop.name}</span></p>
                                                <p className='w-2/6 flex'>Total <span className='sr-only md:not-sr-only md:ml-1'>price</span> :
                                                    <span className='ml-1 text-[#004896]'>{subTotal(totalPricesPerOrder)} RWF</span> </p>
                                                <p className='w-2/6 flex'>Shipping <span className='sr-only md:not-sr-only md:ml-1'>price</span> :
                                                    <span className='ml-1 text-[#004896]'>1000 RWF</span> </p>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>

                            <div className='bg-white text-base font-bold md:w-1/3 absolute bottom-3 -right-3'>
                                <p className='py-3 border-b border-[#004896] text-center
                                text-base lg:text-lg'>Order Summary</p>
                                <div className='flex m-3 text-slate-500'>
                                    <p>Subtotal</p>
                                    <p className='absolute right-8 md:right-10 lg:right-16 text-[#004896]'>
                                        {subTotal(totalPrices)} RWF</p>
                                </div>
                                <div className='flex m-3 text-slate-500'>
                                    <p>Shipping</p>
                                    <p className='absolute right-8 md:right-10 lg:right-16 text-[#004896]'> - RWF </p>
                                </div>
                                <p className='m-3 text-[#004896]'>Have a Coupon</p>
                                <div className='flex bg-slate-200 font-bold py-2 md:py-3'>
                                    <p className='ml-3'>Total</p>
                                    <p className='absolute right-8 md:right-10 lg:right-16'>{subTotal(totalPrices) + 0}</p>
                                </div>
                                <button
                                    className='bg-[#004896] text-white text-lg font-bold uppercase py-2 md:py-3 rounded mt-3
                                    shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={() => checkOut(dispatch, navigate, order)}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )) :
                    (<div className='flex flex-col items-center justify-center font-semibold h-140 md:h-160 lg:h-136'
                    // style={{ minHeight: '40.3vh' }}
                    > your cart is empty </div>)
            }
            <Footer />
        </div>
    )
}

export default Cart
