import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// DB
import { getPost, getPostComments } from '../databaseFunctions';

// components
import Loading from '../Loading';

function Post(props) {
  // props
  const { token } = props;

  // state
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // params
  const { postId } = useParams();

  // useEffect -> get post
  useEffect(() => {
    const fetchPost = async (postId, token) => {
      setIsLoading(true);

      const newPost = await getPost(postId, token);
      setPost(newPost);

      const newComments = await getPostComments(postId, token);
      setComments(newComments);

      setIsLoading(false);
    };
    if (postId && token) {
      fetchPost(postId, token);
    }
  }, [postId, token]);
  
  return (
    <>
    { isLoading || Object.keys(post).length === 0 ? <Loading /> : (
      <>
        <h1>{post.title}</h1>
        <p>{'Posted by '}
          <Link to={`/users/${post.author._id}`}>{post.author.displayName}</Link>
          {' on '}
          <time dateTime={post.createdAt}>{post.createdAt}</time>
        </p>

        <article>
          {post.text}
        </article>

        <h2>Comments</h2>

        { comments.length === 0 ? (<p>No comments</p>) : 
          <div className='table-container'><table>
            <thead>
              <tr>

                <th>
                  link
                </th>

                <th>
                  Author
                </th>

                <th>
                  Text
                </th>

                <th>
                  Created
                </th>

                <th>
                  Updated
                </th>

              </tr>
            </thead>

            <tbody>
              { comments.map((comment) => (
                <tr key={comment._id}>
                  <td>
                    <Link to={`/comments/${comment._id}`}>
                      link
                    </Link>
                  </td>

                  <td>
                    <Link to={`/users/${comment.author._id}`}>
                      {comment.author.displayName}
                    </Link>
                  </td>

                  <td>
                    {comment.text}
                  </td>

                  <td>
                    {comment.createdAt}
                  </td>

                  <td>
                    {comment.updatedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table></div>
        }
      </>)
    }
      
    </>
  );
};

export default Post;