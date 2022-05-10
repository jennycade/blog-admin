import { useState } from 'react';

import Input from './Input';

function PostForm({post, updatePost, leaveForm}) {

  // state
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [postStatus, setPostStatus] = useState(post.postStatus);

  // functions
  const handleTitleChange = (e) => {
    // TODO: add validation
    setTitle(e.target.value);
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
    const newPost = {
      title,
      text,
      postStatus,
    }
    updatePost(newPost);
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

      <div className="button-group">
        <button
          type="submit"
          className="btn-primary"
        >Submit</button>

        {/* TODO: have this pull up a warning */}
        <button
          type="button"
          className="btn-warning"
          onClick={leaveForm}
        >Cancel</button>

      </div>

    </form>
  );
};

export default PostForm;