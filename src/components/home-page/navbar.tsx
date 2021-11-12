import React from 'react';
import './home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function NavBar() {
  return (
    <div className="">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Logo1.png" alt="logo" className='logo' />
          <div className="input-group ps-5">
            <div id="navbar-search-autocomplete" className="form-outline">
              <input className="form-control me-5" type="search" placeholder="Search" aria-label="Search" />
            </div>
            <button type="button" className="btn btn-primary">
              <FontAwesomeIcon icon={["fal", "coffee"]} />
            </button>
          </div>
        </div>
      </nav >
    </div >
  );
}


export default NavBar;
