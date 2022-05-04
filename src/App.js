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
import Post from './routes/Post';
import Users from './routes/Users';
import User from './routes/User';
import Comments from './routes/Comments';
import Comment from './routes/Comment';

// components
import SignInForm from './SignInForm';
import NavBar from './NavBar';

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

              <Route path='posts'>
                <Route index element={
                  <Posts token={token} />
                } />
                <Route path=':postId' element={
                  <Post token={token} />
                } />
              </Route>
              
              <Route path='users'>
                <Route index element={
                  <Users token={token} />
                } />
                <Route path=':userId' element={
                  <User token={token} />
                } />
              </Route>

              <Route path='comments'>
                <Route index element={
                  <Comments token={token} />
                } />
                
                <Route path=':commentId' element={
                  <Comment token={token} />
                } />
                  
              </Route>

              
            </Routes>

          </main>
        </>
      )}
    </div>
  );
}

export default App;
