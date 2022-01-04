import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <div className='bg-dark-blue py-10 text-white'>
            <div className='grid grid-cols-3 border-b-2 mx-28'>
                <div className='m-2 mx-16'>
                    <img className='w-24' src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Logo.png" alt="" />
                    <p className='text-xs'>This where we ut staff about our company This where we ut staff about our company This where we ut staff about our company</p>
                </div>
                <div className=''>
                    <p className='font-bold mt-5'>Follow Us</p>
                    <p className='text-xs mt-3'>This where we put some staff that attracts our clients to our social medias</p>
                </div>
                <div className=''>
                    <p className='font-bold mt-5'>Contact Us</p>
                    <ul>
                        <li className='text-xs'>Company address</li>
                        <li className='text-xs'>BO. Box</li>
                        <li className='text-xs'>Contacts</li>
                        <li className='text-xs'>Email</li>
                    </ul>
                </div>
            </div>
            <div className='grid grid-cols-6 m-2 mx-36'>
                <ul className='items-center'>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                </ul>
                <ul className='items-center'>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                </ul>
                <ul className='items-center'>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                </ul>
                <ul className='items-center'>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                </ul>
                <ul className='items-center'>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                </ul>
                <ul className='items-center'>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                    <li className='text-xs'>Test links</li>
                </ul>
            </div>
        </div>
    )
}
