import React from 'react';
import './home.scss'


function NavBar() {
  return (
    <div className="">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Logo1.png" alt="logo" className='logo' />
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          </form>
        </div>
      </nav>
    </div>
  );
}


export default NavBar;
