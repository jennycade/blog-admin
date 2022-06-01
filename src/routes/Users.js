import { getUsers, getUser } from '../databaseFunctions';

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

// components
import Loading from '../Loading';
import Time from '../Time';

// context
import UserContext from '../UserContext';

function Users(props) {
  // props
  const {
    token,
  } = props;

  // state
  const [users, setUsers] = useState([]);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  // user permissions
  const currentUser = useContext(UserContext);

  // effect: get users on first render
  useEffect(() => {
    if (token && Object.keys(currentUser) !== 0) {
      
      const fetchUsers = async () => {
        if (currentUser.roles.includes('admin')) {
          setUserIsAdmin(true);
          const newUsers = await getUsers(token);
          setUsers(newUsers);
        } else {
          // user not admin—does not have permission
          setUserIsAdmin(false);
          // get own user data
          const singleUser = await getUser(currentUser._id, token);
          setUsers([singleUser]);
        }
        
      };

      fetchUsers();
    }
  }, [token, currentUser]);

  return (
    <>
      <h1>Users</h1>

      <p>Only admin can see all users. You can view your own user details below.</p>

      { users.length === 0 ? <Loading /> :

        <div className='table-container'><table>
          <thead>
            <tr>

              <th>
                Username
              </th>

              <th>
                Display name
              </th>

              <th>
                Roles
              </th>

              <th>
                Created
              </th>

              <th>
                Last updated
              </th>
              
            </tr>
          </thead>
          <tbody>
            { users.map((user) => (
              <tr key={user._id}>
                <td>
                  <Link to={`/users/${user._id}`}>
                    {user.username}
                  </Link>
                </td>

                <td>
                  {user.displayName}
                </td>

                <td>
                  {user.roles.join(', ')}
                </td>

                <td>
                  <Time dateInput={user.createdAt} />
                </td>

                <td>
                  <Time dateInput={user.updatedAt} />
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      }

    </>
  );
};

export default Users;