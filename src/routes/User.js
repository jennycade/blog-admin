import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// DB
import {
  getUser,
  getUserComments,
  getUserPosts,
  updateUser,
  deleteUser,
} from '../databaseFunctions';

// components
import Loading from '../Loading';
import Time from '../Time';
import UserForm from '../UserForm';

function User(props) {
  // props
  const { token } = props;

  // state
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // params
  const { userId } = useParams();

  // get user on load
  useEffect(() => {
    if (userId && token) {
      const fetchUser = async () => {
        setIsLoading(true);

        const newUser = await getUser(userId, token);
        setUser(newUser);

        const newComments = await getUserComments(userId, token);
        setComments(newComments);
        
        const newPosts = await getUserPosts(userId, token);
        setPosts(newPosts);

        setIsLoading(false);
      }
      if (userId && token) {
        fetchUser();
      }
    }
  }, [token, userId]);

  // functions
  // display
  const toggleEdit = () => {
    setEditing(!editing);
  }

  const handleUpdateSubmit = async (newUserData) => {
    // validate
    // TODO

    // save to db
    const newUser = await updateUser(userId, newUserData, token);

    if (newUser.errorMessage) {
      // TODO
      console.error(newUser.errorMessage);
    } else {
      setUser(newUser);
      setEditing(false);
    }
  };

  return (
    <>
      { (isLoading || Object.keys(user).length === 0) && 
        <Loading />
      }

      { !isLoading && editing && (
        <>
          <h1>Update user</h1>
          <UserForm
            user={user}
            saveUser={handleUpdateSubmit}
            leaveForm={() => setEditing(false)}
          />
        </>
      )}

      { !isLoading && !editing && (
        <>
          <h1>{user.username}</h1>

          <button
            className='top-right'
            onClick={toggleEdit}
          >
            Edit
          </button>

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
            <dd><Time dateInput={user.createdAt}/></dd>

            <dt>Last updated</dt>
            <dd><Time dateInput={user.updatedAt}/></dd>

            <h2>Posts</h2>
            { posts.length === 0 ? 
              <p>No posts</p>
              :
              <ul>
                {posts.map((post) => (
                  <li key={post._id}>
                    <Link to={`/posts/${post._id}`}>
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            }

            <h2>Comments</h2>
            { comments.length === 0 ?
              <p>No comments</p>
              :
              <ul>
                {comments.map((comment) => (
                  <li key={comment._id}>
                    <Link to={`/comments/${comment._id}`}>
                      {/* TODO: fix this link! */}
                      {comment.text}
                    </Link>
                    {' on '}
                    <Link to={`/posts/${comment.post._id}`}>
                      {comment.post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            }

          </dl>
        </>
      )}
    </>
  );
};

export default User;