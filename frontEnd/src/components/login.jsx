import React from 'react';
import { useState } from 'react';
import { login } from '../api';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


function Login(){
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
        const token = await login(context)
        console.log(token)
        if(!token)
        alert(`Oops something went wrong. Have you registered...?`);
        setUsername('');
        setPassword('');
    } else {
      setShouldRedirect(true)
    }
   };

   if (shouldRedirect) {
    return <Navigate to="/home"/>
   } else {
    return (
        <div className='container mt-4'>
            <div className="row">
                <div className="col-md-4 col-6 offset-4">
                <div className="card">
                  <h4 className="card-header">Login</h4>
                  <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label username="username" className="form-label">Username</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="username"
                                name="username"
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
                                  name="password"
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
                        <Link to='/user/register'><button className="mt-2 btn btn-warning">Go Register!</button></Link>
                        <Link to='/home'><button className="mt-2 btn btn-success ms-1">Go to homepage!</button></Link>
                    </h6>
              </div>
            </div>
        </div>
    )
   }
};

export default Login;