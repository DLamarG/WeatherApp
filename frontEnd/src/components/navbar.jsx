import React from 'react';
import { Link } from 'react-router-dom';


function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/home"}>Home</Link>
            </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        My Account
                      </a>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/user/add_location">Add Location</Link></li>
                        <li><Link className="dropdown-item" to="/user/user_locations">My Locations</Link></li>
                        <li><Link className="dropdown-item" to="/user/logout">Logout</Link></li>
                      </ul>
                    </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;