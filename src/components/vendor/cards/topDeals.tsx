import React from 'react'

import Image01 from '../../../images/user-36-05.jpg'
import Image02 from '../../../images/user-36-06.jpg'
import Image03 from '../../../images/user-36-07.jpg'
import Image04 from '../../../images/user-36-08.jpg'
import Image05 from '../../../images/user-36-09.jpg'

function DashboardCard10() {
    const customers = [
        {
            id: '0',
            image: Image01,
            name: 'John Mugisha',
            email: 'Mugisha@gmail.com',
            spent: '2,500,000 Rwf',
        },
        {
            id: '1',
            image: Image02,
            name: 'Major Joshua',
            email: 'Major@gmail.com',
            spent: '2,500,000 Rwf',
        },
        {
            id: '2',
            image: Image03,
            name: 'Tracy Murekeyiteto',
            email: 'tracy@gmail.com',
            spent: '2,500,000 Rwf',
        },
        {
            id: '3',
            image: Image04,
            name: 'Alex Nyitezeho',
            email: 'nyitezeho@cool.design',
            spent: '2,500,000 Rwf',
        },
        {
            id: '4',
            image: Image05,
            name: 'Josiane Murekatete',
            email: 'gatete@gmail.com',
            spent: '2,500,000 Rwf',
        },
    ]

    return (
        <>
            <h2 className='font-bold text-xl text-gray-800 '>Top Deals</h2>
            {/* Table */}
            <div>
                {customers.map((customer) => {
                    return (
                        <div
                            className='flex  items-center p-2 justify-between'
                            key={customer.id}
                        >
                            <div className='flex gap-5 flex-shrink-0 mr-2 sm:mr-3'>
                                <img
                                    className='rounded-full'
                                    src={customer.image}
                                    width='40'
                                    height='40'
                                    alt={customer.name}
                                />
                                <div className='font-bold	 text-gray-800'>
                                    <div>{customer.name}</div>
                                    <div className='text-sm text-gray-600'>
                                        {customer.email}
                                    </div>
                                </div>
                            </div>

                            <div className='text-lg text-light-blue font-semibold'>
                                {customer.spent}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default DashboardCard10
