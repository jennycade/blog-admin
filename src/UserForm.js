import { useState } from 'react';

import Form from './Form';
import Input from './Input';

function UserForm({user, saveUser, leaveForm}) {

  // state
  const [username, setUsername] = useState(user.username);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [roles, setRoles] = useState([...user.roles]);

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

  const submitForm = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      displayname: displayName,
      roles,
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