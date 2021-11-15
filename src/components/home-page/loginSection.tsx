import React from 'react';
import './home.scss'
function LoginSection() {
    return (
        <div className='login-section'>
            <div className='input-section p-5'>
                <p className='header d-flex justify-content-center'>come home to quality</p>
                <p className='text d-flex justify-content-center'>find inspiration, products and make it happen -- all in one place</p>
                <div className='row input'>
                    <form className="g-3">
                        <div className="mb-3">
                            <input type="email" className="form-control" id="inputEmail" placeholder="email" />
                        </div>
                        <div>
                            <button type="submit" className="btn mb-3">Sign Up with Email</button>
                        </div>
                    </form>
                    <div className="form-check m-2">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            I agree to the IZITINI terms and conditions
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSection;
