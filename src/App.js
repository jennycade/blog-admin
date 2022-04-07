// import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { useState } from 'react';

const App = () => {
  // props

  // state
  const [currentUser, setCurrentUser] = useState({});

  return (
    <div className='app'>
      { (Object.keys(currentUser).length === 0) && (
        <form>
          <div className='mb-3'>
            <label
              htmlFor="usernameInput"
              className='form-label'
            >Username</label>
            <input type='text' className='form-control' id='usernameInput' />
          </div>
          <div className='mb-3'>
            <label
              htmlFor="passwordInput"
              className='form-label'
            >Password</label>
            <input
              type='password'
              className='form-control'
              id='passwordInput'
            />
          </div>
          <div className='mb-3'>
            <button className='btn btn-primary'>Sign in</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default App;
