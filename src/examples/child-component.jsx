import React, { useState } from "react";

const UserForm = ({ user, onSubmit }) => {
  const [name, setName] = useState(user.name ?? "");
  const [address, setAddress] = useState(user.address ?? "");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.preventPropagation();

    onSubmit({
      name,
      address,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

const UserManagement = ({ users, onAdd, onDelete, onEdit }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const Form = () => {
    if (formOpen) {
      if (selectedUser) return <UserForm onSubmit={editUser} user={{}} />;
      else return <UserForm onSubmit={addUser} user={users[selectedUser]} />;
    }
    return null;
  };

  const addUser = (data) => {
    onAdd(data);
    setFormOpen(false);
  };

  const editUser = (data) => {
    onEdit(selectedUser, data);
    setSelectedUser(null);
    setFormOpen(false);
  };

  return (
    <>
      <button onClick={() => setFormOpen(true)}>Add user</button>
      <table>
        <thead>
          <tr>Name</tr>
          <tr>Address</tr>
          <tr>Action</tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedUser(index);
                    setFormOpen(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => onDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Form />
    </>
  );
};

export default UserManagement;
