import { Link } from "react-router-dom"
import { Navbar } from "./navbar"

const NofFound = () => {

    return (
        <div className='m-0'>
            <Navbar />
            <div className='h-full'
            // style={{ height: '100vh' }}
            >
                <div className='flex flex-col items-center justify-center h-full'

                    style={{ height: '79vh' }}
                >
                    <p className='font-normal text-4xl
                    md:text-7xl xl:text-7xl 2xl:text-9xl'>404</p>
                    <p className='text-sm text-center px-3
                    md:text-lg 2xl:text-4xl
                    '>Sorry!!!, we couldn't find what you are looking for.</p>
                    <Link to={'/'} className='text-[#00adef]
                    text-sm text-center px-3
                    md:text-lg 2xl:text-4xl
                    '> back to homepage</Link>

                </div>

            </div>
        </div>
    )
}

export default NofFound
