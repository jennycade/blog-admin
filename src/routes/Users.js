import { getUsers } from '../databaseFunctions';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// components
import Loading from '../Loading';
import Time from '../Time';

function Users(props) {
  // props
  const {
    token,
  } = props;

  // state
  const [users, setUsers] = useState([]);

  // effect: get users on first render
  useEffect(() => {
    if (token) {
      const fetchUsers = async () => {
        const newUsers = await getUsers(token);
        setUsers(newUsers);
      };

      fetchUsers();
    }
  }, [token]);

  return (
    <>
      <h1>Users</h1>

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