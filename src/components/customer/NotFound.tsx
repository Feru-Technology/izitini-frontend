import { Link } from "react-router-dom"

const NofFound = () => {

    return (
        <div className='m-0'>
            <div className='h-full'
            >
                <div className='flex flex-col items-center justify-center h-full'

                    style={{ height: '79vh' }}
                >
                    <p className='font-normal text-4xl
                    md:text-7xl xl:text-7xl 2xl:text-9xl'>404</p>
                    <p className='text-sm text-center px-3
                    md:text-lg 2xl:text-4xl
                    '>Sorry!!!, we couldn't find what you are looking for.</p>
                    <Link to={'/'} className='text-light-blue
                    text-sm text-center px-3
                    md:text-lg 2xl:text-4xl
                    '> back to homepage</Link>

                </div>

            </div>
        </div>
    )
}

export default NofFound
