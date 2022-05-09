import { useState } from 'react';

import Input from './Input';

function PostForm({post, updatePost}) {

  // state
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [postStatus, setPostStatus] = useState(post.postStatus);

  // functions
  const handleTitleChange = (e) => {
    // TODO: add validation
    setTitle(e.target.title);
  }

  const handleTextChange = (e) => {
    // TODO: add validation
    setText(e.target.value);
  }

  const handlePostStatusChange = (e) => {
    // TODO: add validation
    setPostStatus(e.target.value);
  }

  const submitForm = (e) => {
    e.preventDefault();
    updatePost(title, text);
  }

  return (
    <form onSubmit={submitForm}>
      <Input
        label="Post title"
        id="title"
        type="text"
        value={title}
        handleChange={handleTitleChange}
      />

      <Input
        label="Text"
        id="text"
        type="textarea"
        value={text}
        handleChange={handleTextChange}
      />

      <Input
        label="Status"
        id="postStatus"
        type="select"
        value={postStatus}
        handleChange={handlePostStatusChange}
        options={[
          {value: '', displayName: ''},
          {value: 'draft', displayName: 'Draft'},
          {value: 'published', displayName: 'Published'}
        ]}
      />

      <button
        type="submit"
      >Submit</button>
    </form>
  );
};

export default PostForm;