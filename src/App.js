// import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { useState, useEffect } from 'react';

import {
  Routes, Route, 
} from 'react-router-dom';

// routes
import Home from './routes/Home';
import Posts from './routes/Posts';
import Users from './routes/Users';
import Comments from './routes/Comments';

// components
import SignInForm from './SignInForm';
import NavBar from './NavBar';
import NavBarExample from './examples/navbarExample';

// API stuff
import {
  shouldUseLocalStorageTokenAndUser,
  getLocalStorageTokenAndUser,
  signInUser
} from './databaseFunctions';

const App = () => {
  // state
  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  // effects
  // check for localStorage token
  useEffect(() => {
    if (!token) {
      if (shouldUseLocalStorageTokenAndUser()) {
        const results = getLocalStorageTokenAndUser();
        setToken(results.token);
        setCurrentUser(results.user);
      }
    }
  }, [token]);

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
      {/* SIGN IN FORM */}
      { token === '' && (
        <SignInForm handleSignInSubmit={handleSignInSubmit} />
      )}

      {/* WELCOME */}
      { token !== '' && (
        <>
          <NavBar />

          <main>
            <Routes>
              <Route path='/' element={
                <Home />
              } />
              <Route path='posts' element={
                <Posts />
              } />
              <Route path='users' element={
                <Users />
              } />
              <Route path='comments' element={
                <Comments />
              } />
            </Routes>

          </main>
        </>
      )}
    </div>
  );
}

export default App;
