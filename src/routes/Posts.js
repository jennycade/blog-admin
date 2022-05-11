import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// DB
import {
  getPosts
} from '../databaseFunctions';

// components
import Loading from '../Loading';
import Time from '../Time';

function Posts(props) {
  // props
  const {
    token
  } = props;

  // state
  const [posts, setPosts] = useState([]);

  // effect -> get posts on load or token change
  useEffect(() => {
    const fetchPosts = async (token) => {
      const newPosts = await getPosts(token);
      setPosts(newPosts);
    }
    if (token && token !== '') {
      fetchPosts(token);
    }
  }, [token]);

  return (
    <>
      <h1>Posts</h1>
      <Link to="/posts/new">
        New post
      </Link>
      { posts.length === 0 ? <Loading /> : 
        <div className='table-container'><table>
          <thead>
            <tr>
              <th>
                Title
              </th>
              <th>
                Author
              </th>
              <th>
                Status
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
            {posts.map(post => (
              <tr key={post._id}>
                <td>
                  <Link to={`/posts/${post._id}`} >
                    {post.title}
                  </Link>
                </td>
                <td>
                  <Link to={`/users/${post.author._id}`} >
                    {post.author.displayName}
                  </Link>
                </td>
                <td>
                  <span className={`pill status ${post.postStatus}`}>
                    {post.postStatus}
                  </span>
                </td>
                <td>
                  <Time dateInput={post.createdAt}/>
                </td>
                <td>
                  { post.createdAt === post.updatedAt ? 'never updated' : 
                    <Time dateInput={post.updatedAt}/>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      }
    </>
  );
};

export default Posts;