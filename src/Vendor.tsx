export { }
// import React, { useState } from 'react'
// import { Routes, Route, useLocation } from 'react-router-dom'
// import Header from './components/vendor/Header'
// import SiderBar from './components/vendor/SiderBar'
// import { useMediaQuery } from 'react-responsive'
// import { Transition } from '@headlessui/react'

// function Vendor() {
//     const [isClosed, setIsClosed] = useState(false)

//     const isStatic = useMediaQuery({
//         query: '(min-width: 640px)',
//     })

//     return (
//         <div className='flex h-screen overflow-hidden'>
//             {/* Sidebr  */}
//             <SiderBar
//                 isClosed={isClosed}
//                 setIsClosed={setIsClosed}
//                 isStatic={isStatic}
//             />
//             {/* Header  */}
//             <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
//                 <Header
//                     isClosed={isClosed}
//                     setIsClosed={setIsClosed}
//                     isStatic={isStatic}
//                 />
//                 <Transition
//                     appear={true}
//                     show={!isStatic && !isClosed}
//                     enter='transition-opacity duration-200'
//                     enterFrom='opacity-0'
//                     enterTo='opacity-50'
//                     leave='transition-opacity duration-200'
//                     leaveFrom='opacity-50'
//                     leaveTo='opacity-0'
//                 >
//                     <div className='fixed inset-0 bg-black opacity-60 z-10' />
//                 </Transition>
//             </div>
//         </div>
//     )
// }

// export default Vendor
