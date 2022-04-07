import React, { useState } from "react";
import UserManagement from "./child-component";

const GroupForm = ({ initialUsers = [] }) => {
  const [users, setUsers] = useState(initialUsers);

  const addUser = (newUser) => setUsers([...users, newUser]);

  const deleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const editUser = (index, editedUser) => {
    const updatedUsers = [...users];
    updatedUsers[index] = editedUser;
    setUsers(updatedUsers);
  };

  const handleSubmit = (event) => {
    // send a request to create a group with the given users
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="groupName">Group Name</label>
        <input type="text" id="groupName" name="groupName" />

        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" />

        <button type="submit">Submit</button>
      </form>
      <UserManagement
        users={users}
        onAdd={addUser}
        onDelete={deleteUser}
        onEdit={editUser}
      />
    </>
  );
};

export default GroupForm;
