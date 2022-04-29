import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// DB
import { getUser } from '../databaseFunctions';

// components
import Loading from '../Loading';

function User(props) {
  // props
  const { token } = props;

  // state
  const [user, setUser] = useState({});
  const [display, setDisplay] = useState('view');

  // params
  const { userId } = useParams();

  // get user on load
  useEffect(() => {
    if (userId && token) {
      const fetchUser = async () => {
        const newUser = await getUser(userId, token);
        setUser(newUser);
      }
      fetchUser();
    }
  }, [token, userId]);

  // functions
  const toggleView = () => {
    if (display === 'view') {
      setDisplay('edit');
    } else {
      setDisplay('view');
    }
  }

  return (
    <>
      { Object.keys(user).length === 0 && 
        <Loading />
      }

      { Object.keys(user).length > 0 && (
        <>
          <button
            className='btn btn-primary'
            onClick={toggleView}
          >
            { display === 'view' ? 'Edit' : 'Cancel'}
          </button>

          { display === 'view' && (
            <>
              <h1>{user.username}</h1>

              <dl>
                <dt>Display name</dt>
                <dd>{user.displayName}</dd>

                <dt>Roles</dt>
                { 
                  user.roles.map((role) => (
                    <dd key={role}>
                      {role}
                    </dd>
                  ))
                }
                
                <dt>User created</dt>
                <dd><time>{user.createdAt}</time></dd>

                <dt>Last updated</dt>
                <dd><time>{user.updatedAt}</time></dd>

                {/* TODO: add posts */}

              </dl>
            </>
          )}

          { display === 'edit' && (
            <form>
              <label>Display name</label>
              <input type="text"/>
            </form>
          )}

          
        </>
      )}
    </>
  );
};

export default User;