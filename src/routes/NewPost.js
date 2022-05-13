import { useState } from 'react';
import { Link } from 'react-router-dom';

// components
import PostForm from '../PostForm';

import { createPost } from '../databaseFunctions';

function NewPost ({token}) {
  // state
  const [postId, setPostId] = useState('');

  // blank post
  const post = {
    title: '',
    text: '',
    postStatus: 'draft',
  }

  // functions
  const handleSubmit = async (newPostData) => {
    // validate
    // TODO

    // save to db
    const newPost = await createPost(newPostData, token);

    if (newPost.errorMessage) {
      // TODO
      console.log(newPost.errorMessage);
    } else {
      setPostId(newPost._id);
    }
  }

  return (
    <>
      <h1>Create Post</h1>
      { postId === '' ? (
        <PostForm
          post={post}
          updatePost={handleSubmit}
          leaveForm="/posts"
        />
      ) : (
        <p>Success! <Link to={`/posts/${postId}`}>View your post.</Link></p>
      ) 
      }
    
    </>
    
  );
};

export default NewPost;