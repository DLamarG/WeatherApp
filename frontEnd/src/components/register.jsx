import React from 'react';
import { useState } from 'react';
import { register } from '../api';
import { Link, Navigate } from 'react-router-dom';


function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isButtonClicked){
        const context = ({"username":username,"password":password})
        const response = await register(context)
        if(response.password){
           setShouldRedirect(true)
        } else {
          return response.username
        }   
    }
   };
if (shouldRedirect){
  return <Navigate to="/chef/login" />
} else {
    return (
        <div className='container mt-4'>
            <div className="row">
                <div className="col-md-8 col-12 offset-2">
                <div className="card">
                  <h4 className="card-header">Register</h4>
                  <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label username="username" className="form-label">Username</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="username"
                                value={username}
                                onChange={handleUsernameChange} 
                                required
                                />
                            </div>
                            <div className="mb-3">
                            <div className="mb-3">
                                <label password="pwd" className="form-label">Password</label>
                                <input
                                 type="password"
                                  className="form-control" 
                                  id="password"
                                  value={password}
                                  onChange={handlePasswordChange}
                                  required
                                   />
                            </div>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                        </form>
                  </div>
                  </div>
                  <h6 className="card-title">
                        <Link to='/user/login'><button className="mt-2 btn btn-warning">Go Login!</button></Link>
                    </h6>
              </div>
            </div>
        </div>
    )
}
};

export default Register;