import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// DB
import {
  getUser,
  getUserComments,
  getUserPosts,
} from '../databaseFunctions';
import Input from '../Input';

// components
import Loading from '../Loading';

function User(props) {
  // props
  const { token } = props;

  // state
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [display, setDisplay] = useState('view');

  // params
  const { userId } = useParams();

  // get user on load
  useEffect(() => {
    if (userId && token) {
      const fetchUser = async () => {
        const newUser = await getUser(userId, token);
        setUser(newUser);

        const newComments = await getUserComments(userId, token);
        setComments(newComments);
        
        const newPosts = await getUserPosts(userId, token);
        setPosts(newPosts);
      }
      
      fetchUser();
    }
  }, [token, userId]);

  // functions
  // display
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

          { display === 'edit' && (
            <form>
              <Input
                label="Display name"
                id="displayName"
                type="text"
                value={user.displayName}
                onChange={() => {}}
              />

              <fieldset>
                <legend>Roles</legend>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="commenterRole"
                    checked
                    disabled
                  />
                  <label
                    for="commenterRole"
                    className="form-check-label"
                  >Commentor (required)</label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="authorRole"
                    checked={user.roles.includes('author')}
                  />
                  <label
                    for="authorRole"
                    className="form-check-label"
                  >Author</label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="adminRole"
                    checked={user.roles.includes('admin')}
                  />
                  <label
                    for="adminRole"
                    className="form-check-label"
                  >Admin</label>
                </div>

              </fieldset>
              
              <button
                type="submit"
                className="btn btn-primary"
              >Submit</button>

              {/* TODO: hook it up! */}

            </form>
          )}

          
        </>
      )}
    </>
  );
};

export default User;