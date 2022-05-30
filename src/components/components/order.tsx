import { IOrder, IOrderItem } from "../../redux/order/order.interface"

const OrderComponent = (order: any) => {

    return (
        <>
            <div className='w-full p-0.5 md:my-5 md:px-5 lg:my-6 lg:px-6'>
                <table className='w-full border-gray-200 text-gray-600'>
                    <thead className='bg-gray-100'>
                        <tr className='font-bold text-xs md:text-sm text-center border uppercase'>
                            <th
                                scope='col'
                                className='
                py-3 lg:text-base
    '
                            >Products</th>
                            <th
                                scope='col'
                                className='
                py-3 lg:text-base sr-only md:not-sr-only
    '
                            >Price</th>
                            <th
                                scope='col'
                                className='
                py-3 lg:text-base sr-only md:not-sr-only
    '
                            >Quantity</th>
                            <th
                                scope='col'
                                className='
                py-3 lg:text-base sr-only lg:not-sr-only
    '
                            >Notes</th>
                        </tr>
                    </thead>

                    <tbody>
                        {order.order_items.map((item: IOrderItem) => {
                            return (
                                <tr className='border text-gray-900'>
                                    <td className='md:w-2/4'>
                                        <div className='md:flex p-3'>
                                            <div className='w-8/12 md:w-1/3 md:p-1'>
                                                <img className=' 2xl:h-52 w-full'
                                                    src={item.product.display_image || 'https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png'} alt='' />
                                            </div>
                                            <div className='md:w-2/3 md:px-3'>
                                                <ul className='font-normal text:xs md:text-base text-gray-800'>
                                                    <li className='font-bold text:sm text-lg'>{item.product.name}</li>
                                                    <li>By <span className='text-sm italic text-gray-500'>product Brand</span> </li>
                                                    <li className='md:sr-only'>Price: <span className='text-sm italic text-gray-500'>{item.product.price} Frw</span></li>
                                                    <li>Color: <span className='text-sm italic text-gray-500'>Red</span></li>
                                                    <li>Size: <span className='text-sm italic text-gray-500'>Lg</span></li>
                                                    <li className='md:sr-only'>Qty: <span className='text-sm italic text-gray-500'>2</span></li>
                                                    <li className='lg:sr-only'>Note: <span className='text-sm italic text-gray-500'>note</span></li>
                                                </ul>

                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center sr-only md:not-sr-only'>{item.product.price}</td>
                                    <td className='text-center sr-only md:not-sr-only'>{item.quantity}</td>
                                    <td className='text-center sr-only lg:not-sr-only'>{item.details}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>

                <div className='mt-5 border'>
                    <h1 className='border-b'> <span className='px-2 py-3 font-bold text-lg'>More Details</span> </h1>
                    <ul className='space-y-2 px-2 py-3 font-semibold text-base text-gray-500'>
                        <li>Order no: <span className='font-normal ml-2 text-gray-900'>1</span></li>
                        <li>Type: <span className='font-normal ml-2 text-gray-900'>Sample</span></li>
                        <li>Is Paid: <span className='font-normal ml-2 text-gray-900'>Yes</span></li>
                        <li>Paid Amount: <span className='font-normal ml-2 text-gray-900'>1000</span></li>
                        <li>Payment method: <span className='font-normal ml-2 text-gray-900'>card</span></li>
                        <li>Total Order cost: <span className='font-normal ml-2 text-gray-900'>20000</span></li>
                        <li>Total Shipping cost: <span className='font-normal ml-2 text-gray-900'>5000</span></li>
                        <li>Shipping method: <span className='font-normal ml-2 text-gray-900'>transit</span></li>
                        <li>Shipping address: <span className='font-normal ml-2 text-gray-900'>123456 ave</span></li>

                    </ul>

                </div>

            </div>
        </>
    )
}

export default OrderComponent
