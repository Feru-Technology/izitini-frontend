import React from 'react';
import './home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function NavBar() {
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-expand-md navbar-light ">
        <div className="container-fluid">
          <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Logo1.png" alt="logo" className='logo' />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex mx-5">
              <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
              <button type="button" className="btn btn-primary">
                <FontAwesomeIcon icon={["fal", "coffee"]} />
              </button>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-lg-5">
                Sign in as a Customer
              </li>
              <li className="nav-item mx-lg-5">
                Sign in as a Seller
              </li>
            </ul>
          </div>
        </div>
      </nav >
    </div>
  );
}


export default NavBar;
