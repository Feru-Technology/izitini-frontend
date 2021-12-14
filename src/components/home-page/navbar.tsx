import React from 'react';
import './home.scss'
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosHeartEmpty, IoMdConstruct } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa";

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
                <input type="text" className="form-control input" placeholder="search product" aria-label="Username" aria-describedby="basic-addon1" />

                <span className="input-group-text" id="basic-addon1">
                  <BsSearch size={25} />
                </span>

              </div>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item mx-3 mt-2">
                <p className="nav-link icon">
                  <IoIosHeartEmpty size={25} /> </p>
              </li>
              <li className="nav-item mx-3 mt-2">
                <p className="nav-link">
                  <AiOutlineShoppingCart size={25} />
                </p>
              </li>
              <li className="nav-item mx-3 mt-2">
                <p className="nav-link ">
                  <AiOutlineUser size={25} /><Link to="/login">  Sign in as a Customer</Link></p>
              </li>
              <li className="nav-item mx-3 mt-2">
                <p className="nav-link">
                  <AiOutlineUser size={25} />  Sign in as a Seller</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="d-flex justify-content-center">
        <div className='mx-5 my-3 panel-heading'>
          <IoMdConstruct size={21} /> BUY YOUR PRODUCTS
        </div>
        <div className='mx-5 my-3 panel-heading'>
          <FaBuilding size={18} /> GET IDEAS
        </div>
      </div>
      <div className='d-none d-sm-block'>
        <div className="d-flex justify-content-center nav-categories">
          <p className="nav-item mx-lg-3 mt-2">
            Building Materials
          </p><p className="nav-item mx-3 mt-2">
            Paint
          </p><p className="nav-item mx-3 mt-2">
            Building Materials
          </p><p className="nav-item mx-3 mt-2">
            Electricity and lightenings
          </p><p className="nav-item mx-3 mt-2">
            Bath & Faucet
          </p><p className="nav-item mx-3 mt-2">
            Steel
          </p><p className="nav-item mx-3 mt-2">
            Wood
          </p><p className="nav-item mx-3 mt-2">
            Electricity & Lightning
          </p><p className="nav-item mx-3 mt-2">
            see all
          </p>
        </div>
      </div>

    </div>
  );
}


export default NavBar;
