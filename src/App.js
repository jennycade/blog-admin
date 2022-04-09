// import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { useState } from 'react';
import SignInForm from './SignInForm';

const App = () => {
  // props

  // state
  const [currentUser, setCurrentUser] = useState({});

  return (
    <div className='app col-lg-8 mx-auto p-3 py-md-5'>
      { (Object.keys(currentUser).length === 0) && (
        <SignInForm />
      )}
    </div>
  );
}

export default App;
