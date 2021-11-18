import React from 'react';
import './home.scss'
function LoginSection() {
    return (
        <div className='login-section'>
            <div className='input-section p-5'>
                <p className='header d-flex justify-content-center'>come home to quality</p>
                <p className='text d-flex justify-content-center'>Find inspiration, products and make it happen - all in one place</p>
                <div className='row input'>
                    <form className="g-3">
                        <div className="mb-3">
                            <input type="email" className="form-control" id="inputEmail" placeholder="email" />
                        </div>
                        <div>
                            <button type="submit" className="btn mb-3">Sign Up with Email</button>
                        </div>
                        <p className='text-center'>By signing up  I agree to the IZITINI Terms of use and Privacy Policy</p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginSection;
