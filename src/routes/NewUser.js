import { useState } from 'react';
import { Link } from 'react-router-dom';

// components
import UserForm from '../UserForm';

import { createUser } from '../databaseFunctions';

function NewUser ({token}) {
  // state
  const [userId, setUserId] = useState('');

  // blank user
  const user = {
    username: '',
    displayName: '',
    password: '',
    roles: [],
  };

  // functions
  const handleSubmit = async (newUserData) => {
    // validate
    // TODO

    // save to db
    const newUser = await createUser(newUserData, token);

    if (newUser.errorMessage) {
      // TODO
      console.error(newUser.errorMessage);
    } else {
      setUserId(newUser.user._id);
    }
  }

  return (
    <>
      <h1>Create User</h1>
      { userId === '' ? (
        <UserForm
          user={user}
          saveUser={handleSubmit}
          leaveForm="/users"
          isNewUser={true} 
        />
      ) : (
        <p>Success! <Link to={`/users/${userId}`}>View user.</Link></p>
      )}
    </>
  );
}

export default NewUser;