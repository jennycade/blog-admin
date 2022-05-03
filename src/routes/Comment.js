import { getComment } from '../databaseFunctions';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// components
import Loading from '../Loading';

function Comment (props) {
  // props
  const { token } = props;

  // state
  const [comment, setComment] = useState({});

  // param
  const {commentId} = useParams();

  // effect: load comment
  useEffect(() => {
    if (token && commentId) {
      const fetchComment = async () => {
        const newComment = await getComment(commentId, token);
        setComment(newComment);
      };

      fetchComment();
    }
  }, [token, commentId]);

  return (
    <>
      <h1>Comment detail</h1>
      { Object.keys(comment) === 0 ? <Loading /> : 
        <dl>

          <dt>Post</dt>
          <dd>
            <Link to={`/posts/${comment.post._id}`}>
              {comment.post.title}
            </Link>
          </dd>

          <dt>Comment author</dt>
          <dd>
            <Link to={`/users/${comment.author._id}`}>
              {comment.author.displayName}
            </Link>
          </dd>

          <dt>Text</dt>
          <dd>
            {comment.text}
          </dd>

          <dt>Created</dt>
          <dd>
            {comment.createdAt}
          </dd>

          <dt>Last updated</dt>
          <dd>
            {comment.updatedAt}
          </dd>
        </dl>
      }
    </>
  );
}

export default Comment;