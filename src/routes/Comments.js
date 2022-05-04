import { getComments } from '../databaseFunctions';

import { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';

// components
import Loading from '../Loading';

function Comments(props) {
  // props
  const { token } = props;

  // state
  const [comments, setComments] = useState([]);

  // effect: get comments on load
  useEffect(() => {
    if (token) {
      const fetchComments = async () => {
        const newComments = await getComments(token);
        setComments(newComments);
      };

      fetchComments();
    }
  }, [token]);

  return (
    <>
      <h1>Comments</h1>

      { comments.length === 0 ? <Loading /> : 
        <div className='table-container'><table>
          <thead>
            <tr>

              <th>
                link
              </th>

              <th>
                Post
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
                  <Link to={`/posts/${comment.post._id}`}>
                    {comment.post.title}
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
    </>
  );
};

export default Comments;