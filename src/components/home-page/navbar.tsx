import React from 'react';
import './home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faHeart, faCartArrowDown } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-5">
        <div className="container-fluid">
          <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Logo1.png" alt="logo" className='logo mb-2' />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="container-fluid w-25">
              <div className="input-group">
                <input type="text" className="form-control input" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />

                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faSearch} /></span>

              </div>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item mx-3 mt-2">
                <p className="nav-link">
                  <FontAwesomeIcon icon={faHeart} /> </p>
              </li>
              <li className="nav-item mx-3 mt-2">
                <p className="nav-link">
                  <FontAwesomeIcon icon={faCartArrowDown} /> </p>
              </li>
              <li className="nav-item mx-3 mt-2">
                <p className="nav-link">
                  <FontAwesomeIcon icon={faUser} />  Sign in as a Customer</p>
              </li>
              <li className="nav-item mx-3 mt-2">
                <p className="nav-link">
                  <FontAwesomeIcon icon={faUser} />  Sign in as a Seller</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="d-flex justify-content-center">
        <div className='mx-5 my-3 panel-heading'>
          BUY YOUR PRODUCTS
        </div>
        <div className='mx-5 my-3 panel-heading'>
          GET IDEAS
        </div>
      </div>
    </div>
  );
}


export default NavBar;
