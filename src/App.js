// import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { useState } from 'react';
import SignInForm from './SignInForm';

// API stuff
import {
  signInUser
} from './databaseFunctions';

const App = () => {
  // state
  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  // functions
  const handleSignInSubmit = async (username, password) => {
    // try to sign in
    const result = await signInUser(username, password);
    if (result.errorMessage) {
      alert(result.errorMessage);
    } else {
      setToken(result.token);
      setCurrentUser(result.user);
    }
  }

  return (
    <div className='app col-lg-8 mx-auto p-3 py-md-5'>
      { (Object.keys(currentUser).length === 0) && (
        <SignInForm handleSignInSubmit={handleSignInSubmit} />
      )}
    </div>
  );
}

export default App;
