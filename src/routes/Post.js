import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// DB
import { getPost } from '../databaseFunctions';

function Post(props) {
  // props
  const { token } = props;

  // state
  const [post, setPost] = useState({});

  // params
  const { postId } = useParams();

  // useEffect -> get post
  useEffect(() => {
    const fetchPost = async (postId, token) => {
      const newPost = await getPost(postId, token);
      setPost(newPost);
    };
    if (postId && token) {
      fetchPost(postId, token);
    }
  }, [postId, token,]);
  
  return (
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
    </>
  );
};

export default Post;