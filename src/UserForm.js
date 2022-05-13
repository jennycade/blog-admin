import { useState } from 'react';

import Form from './Form';
import Input from './Input';

function UserForm({user, saveUser, leaveForm, isNewUser}) {

  // state
  const [username, setUsername] = useState(user.username);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [roles, setRoles] = useState([...user.roles]);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // functions

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }
  const handleDisplayNameChange = (e) => {
    // TODO: validate
    setDisplayName(e.target.value);
  }

  const handleRolesChange = (newRoles) => {
    // TODO: validate
    setRoles(newRoles);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();

    // validate
    // TODO

    const newUser = {
      username,
      displayname: displayName,
      roles,
    }

    if (isNewUser) {
      newUser.password = password;
      newUser.password2 = password2;
    }
    saveUser(newUser);
  }

  return (
    <Form
      handleSubmit={submitForm}
      leaveForm={leaveForm}
    >
      <Input
        label="Username"
        id="username"
        type="text"
        value={username}
        handleChange={handleUsernameChange}
      />

      { isNewUser && (
        <>
          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            handleChange={handlePasswordChange}
          />
          <Input
            label="Re-enter password"
            id="password2"
            type="password"
            value={password2}
            handleChange={handlePassword2Change}
          />
        </>
        
      )}

      <Input
        label="Display name"
        id="displayName"
        type="text"
        value={displayName}
        handleChange={handleDisplayNameChange}
      />

      <Input
        label="Roles"
        id="roles"
        type="checkboxGroup"
        value={roles}
        options={[
          {value: 'admin', displayName: 'Admin'},
          {value: 'author', displayName: 'Author'}
        ]}
        handleChange={handleRolesChange}
      />

    </Form>
  );
};

export default UserForm;