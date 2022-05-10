import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// DB
import {
  getPost,
  getPostComments,
  updatePost,
} from '../databaseFunctions';

// components
import Loading from '../Loading';
import PostForm from '../PostForm';
import Time from '../Time';

function Post({ token }) {

  // state
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);

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

  // functions
  const toggleEdit = () => {
    setEditing(!editing);
  }

  const handleUpdateSubmit = async (newPostData) => {
    // validate
    // TODO

    // save to db
    const newPost = await updatePost(postId, newPostData, token);

    if (newPost.errorMessage) {
      // TODO
      console.log(newPost.errorMessage);
    } else {
      setPost(newPost);
      setEditing(false);
    }

    // leave editing
  }
  
  return (
    <>
    { (isLoading || Object.keys(post).length === 0) &&
      <Loading />
    }

    { !isLoading && editing && (
      <>
        <h1>Update post</h1>
        <PostForm
          post={post}
          updatePost={handleUpdateSubmit}
          leaveForm={() => setEditing(false)}
        />
      </>
    )}

    { !isLoading && !editing && (
        <>
          <h1>{post.title}</h1>

          <button className="top-right" onClick={toggleEdit}>Edit</button>

          <p>{'Posted by '}
            <Link to={`/users/${post.author._id}`}>{post.author.displayName}</Link>
            {' on '}
            <Time dateInput={post.createdAt} />
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
                      <Time dateInput={comment.createdAt} />
                    </td>

                    <td>
                      <Time dateInput={comment.updatedAt} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>
          }
        </>
      )
    }
      
    </>
  );
};

export default Post;