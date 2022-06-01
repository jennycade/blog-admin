import './App.css';

import React from 'react';
import { useState, useEffect } from 'react';

import {
  Routes, Route, 
} from 'react-router-dom';

// routes
import Home from './routes/Home';
import Posts from './routes/Posts';
import Post from './routes/Post';
import NewPost from './routes/NewPost';
import Users from './routes/Users';
import User from './routes/User';
import NewUser from './routes/NewUser';
import Comments from './routes/Comments';
import Comment from './routes/Comment';

// components
import SignInForm from './SignInForm';
import NavBar from './NavBar';

// context
import UserContext from './UserContext';

// API stuff
import {
  shouldUseLocalStorageTokenAndUser,
  getLocalStorageTokenAndUser,
  deleteLocalStorageTokenAndUser,
  signInUser,
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
  const handleSignOut = async () => {
    deleteLocalStorageTokenAndUser();
    setToken('');
    setCurrentUser({});
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className='app'>
        {/* SIGN IN FORM */}
        { token === '' && (
          <SignInForm handleSignInSubmit={handleSignInSubmit} />
        )}

        {/* WELCOME */}
        { token !== '' && (
          <>
            <NavBar
              currentUser={currentUser}
              signOut={handleSignOut}
            />

            <main>
              <Routes>

                <Route path='/' element={
                  <Home />
                } />

                <Route path='posts'>
                  <Route index element={
                    <Posts token={token} />
                  } />
                  <Route path='new' element={
                    <NewPost token={token} />
                  } />
                  <Route path=':postId' element={
                    <Post token={token} />
                  } />
                </Route>
                
                <Route path='users'>
                  <Route index element={
                    <Users token={token} />
                  } />
                  <Route path='new' element={
                    <NewUser token={token} />
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
    </UserContext.Provider>
  );
}

export default App;
