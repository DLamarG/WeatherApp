import React from 'react';
import { Navigate } from "react-router-dom";
import { useState } from 'react';


function Logout() {
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token');
    const userToken = localStorage.getItem("token");

    if(userToken){
      alert(`Oops something went wrong!`);
    } else {
      setShouldRedirect(true)
    }
  };

  if(shouldRedirect){
    return <Navigate to='/user/login'/>
  } else {
  return (
    <div className='container mt-4'>
      <div className="row">
        <div className="col-md-4 col-6 offset-4">
          <div className="card">
              <h1 className="card-header">Logout</h1>
              <div className="card-body">
              <button className="mt-2 btn btn-warning" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
  }
}

export default Logout;
