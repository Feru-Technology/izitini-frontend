import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <div className='bg-dark-blue pb-2 md:py-5 lg:py-10 text-white'>
            <div className='grid grid-cols-1 md:grid-cols-3 border-b-2 md:mx-12 lg:mx-28'>
                <div className='m-2 md:mx-8 lg:mx-16'>
                    <img className='w-16 md:w-24' src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Logo.png" alt="" />
                    <p className='text-xs'>This where we ut staff about our company This where we ut staff about our company This where we ut staff about our company</p>
                </div>
                <div className=''>
                    <p className='font-bold mt-3 md:mt-5'>Follow Us</p>
                    <p className='text-xs mt-1 md:mt-3'>This where we put some staff that attracts our clients to our social medias</p>
                </div>
                <div className=''>
                    <p className='font-bold mt-3 md:mt-5'>Contact Us</p>
                    <ul className='mt-1 mb-2'>
                        <li className='text-xs'>Company address</li>
                        <li className='text-xs'>BO. Box</li>
                        <li className='text-xs'>Contacts</li>
                        <li className='text-xs'>Email</li>
                    </ul>
                </div>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-6 m-2 md:mx-16 lg:mx-36'>
                <ul className='items-center mt-2'>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                </ul>
                <ul className='items-center mt-2'>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                </ul>
                <ul className='items-center mt-2'>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                </ul>
                <ul className='items-center mt-2'>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                </ul>
                <ul className='items-center mt-2'>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                </ul>
                <ul className='items-center mt-2'>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                </ul>
            </div>
        </div>
    )
}
