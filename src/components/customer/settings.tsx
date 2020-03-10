import { useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { Transition } from '@headlessui/react'
import { useAuth } from '../../utils/hooks/auth'
import { useMediaQuery } from 'react-responsive'

const Settings = () => {

    useAuth()

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(false)

    return (
        <>
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
                        name={''}
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

                    {/* user dashboard */}

                    <div>Coming soon...</div>

                </div>
            </div>

        </>)
}

export default Settings
