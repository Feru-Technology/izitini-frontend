import React from 'react';
import './home.scss'
function LoginSection() {
    return (
        <div className='m-5 login-section bg'>
            <div className='input-section'>
                <p>come home to quality</p>
                <p>find inspiration, products and make it happen -- all in one place</p>
                <div className='row input'>
                    <form className="g-3">
                        <div className="w-75">
                            <input type="email" className="form-control" id="inputEmail" placeholder="email" />
                        </div>
                        <div className="">
                            <button type="submit" className="btn btn-primary mb-3">Sign Up with Email</button>
                        </div>
                    </form>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            I agree to the IZITINI terms and contition
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSection;
