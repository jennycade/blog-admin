// import React from "react";

export const shouldUseLocalStorageTokenAndUser = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  return (token && user);
}

export const getLocalStorageTokenAndUser = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  return {token, user};
};

export const setLocalStorageTokenAndUser = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const deleteLocalStorageTokenAndUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getAPIHeaders = (token = '') => {
  const result = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });
  if (token !== '') {
    result.set('Authorization', `Bearer ${token}`);
  }
  return result;
}

export const signInUser = async (username, password) => {
  // success: return {token, user}
  // fail: return {errorMessage}

  // TODO: fail unless user has admin or author role
  
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/login`,
    {
      method: 'POST',
      headers: getAPIHeaders(),
      body: JSON.stringify({ username, password })
    }
  );
  const json = await response.json();
  
  // errors?
  if (!response.ok) {
    return({errorMessage: json.error});
  } else {
    // save to localStorage
    setLocalStorageTokenAndUser(json.token, json.user);
    return {token: json.token, user: json.user};
  }
}

export const registerUser = async (username, password, displayName) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/users`,
    {
      method: 'POST',
      headers: getAPIHeaders(),
      body: JSON.stringify({ username, password, displayname: displayName, iscommenter: 'true' })
    }
  );
  const json = await response.json();
  
  if (!response.ok) {
    return {errorMessage: json.error};
  } else {
    return true;
  }
};

// POSTS

export const getPosts = async (token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/posts`,
    {
      method: 'GET',
      headers: getAPIHeaders(token),
    }
  );
  const json = await response.json();

  if (!response.ok) {
    return { errorMessage: json.error };
  } else {
    return json;
  }
}

export const getPost = async (postId, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/posts/${postId}`,
    {
      method: 'GET',
      headers: getAPIHeaders(token),
    }
  );
  const json = await response.json();

  if (!response.ok) {
    return { errorMessage: json.error };
  } else {
    return json;
  }
}

export const updatePost = async (postId, post, token) => {
  const postData = {
    title: post.title,
    text: post.text,
    postStatus: post.postStatus,
  };
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/posts/${postId}`,
    {
      method: 'PUT',
      headers: getAPIHeaders(token),
      body: JSON.stringify(postData),
    }
  );
  const json = await response.json();
  if (!response.ok) {
    return {errorMessage: json.error};
  } else {
    return json; // updated post object
  }
}

export const deletePost = async (postId, token) => {
  // TODO
}

export const createPost = async (post, token) => {
  const postData = {
    title: post.title,
    text: post.text,
    postStatus: post.postStatus,
  };
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/posts/`,
    {
      method: 'POST',
      headers: getAPIHeaders(token),
      body: JSON.stringify(postData),
    }
  );
  const json = await response.json();
  if (!response.ok) {
    return {errorMessage: json.error};
  } else {
    return json; // updated post object
  }
}

export const getPostComments = async (postId, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/posts/${postId}/comments`,
    {
      method: 'GET',
      headers: getAPIHeaders(token),
    },
  );
  const json = await response.json();

  if (!response.ok) {
    return { errorMessage: json.error };
  } else {
    return json;
  }
};

// USERS

export const getUsers = async (token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/users`,
    {
      method: 'GET',
      headers: getAPIHeaders(token),
    },
  );
  const json = await response.json();

  if (!response.ok) {
    return {errorMessage: json.error};
  } else {
    return json;
  }
}

export const getUser = async (userId, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/users/${userId}`,
    {
      method: 'GET',
      headers: getAPIHeaders(token),
    },
  );
  const json = await response.json();

  if (!response.ok) {
    return { errorMessage: json.error };
  } else {
    return json;
  }
}

export const getUserPosts = async (userId, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/users/${userId}/posts`,
    {
      method: 'GET',
      headers: getAPIHeaders(token),
    },
  );
  const json = await response.json();

  if (!response.ok) {
    return { errorMessage: json.error };
  } else {
    return json;
  }
}

export const getUserComments = async (userId, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/users/${userId}/comments`,
    {
      method: 'GET',
      headers: getAPIHeaders(token),
    },
  );
  const json = await response.json();

  if (!response.ok) {
    return { errorMessage: json.error };
  } else {
    return json;
  }
}

export const updateUser = async (userId, user, token) => {
  // convert roles array to booleans
  const newUserData = {...user};
  newUserData.isauthor = user.roles.includes('author').toString();
  newUserData.isadmin = user.roles.includes('admin').toString();
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/users/${userId}`,
    {
      method: 'PUT',
      headers: getAPIHeaders(token),
      body: JSON.stringify(newUserData),
    },
  );
  const json = await response.json();

  if (!response.ok) {
    return { errorMessage: json.error };
  } else {
    return json;
  }
}

export const deleteUser = async (userId, token) => {
  // TODO
}

export const createUser = async (user, token) => {
  // convert roles array to booleans
  const newUserData = {...user};
  newUserData.isauthor = user.roles.includes('author').toString();
  newUserData.isadmin = user.roles.includes('admin').toString();
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/users`,
    {
      method: 'POST',
      headers: getAPIHeaders(token),
      body: JSON.stringify(newUserData),
    },
  );
  const json = await response.json();

  if (!response.ok) {
    return { errorMessage: json.error };
  } else {
    return json;
  }
}

// COMMENTS
export const getComments = async (token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/comments`,
    {
      method: 'GET',
      headers: getAPIHeaders(token),
    },
  );
  const json = await response.json();

  if (!response.ok) {
    return {errorMessage: json.error};
  } else {
    return json;
  }
}

export const getComment = async (commentId, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/comments/${commentId}`,
    {
      method: 'GET',
      headers: getAPIHeaders(token),
    },
  );
  const json = await response.json();

  if (!response.ok) {
    return { errorMessage: json.error };
  } else {
    return json;
  }
}

export const updateComment = async (commentId, comment) => {
  // TODO
}

export const deleteComment = async (commentId) => {
  // TODO
}

export const createComment = async (comment) => {
  // TODO
}


// AUTH
// functions to check user permissions from the db
// possibly redundant? API already checks db for edits.
export const isUserPostAuthor = (post, userId) => {
  return post.author._id === userId;
};

export const isUserCommentAuthor = (comment, userId) => {
  return comment.author._id === userId;
};

export const isUserSelf = (user, userId) => {
  return user._id === userId;
};

export const isUserAdmin = async (userId) => {
  const user = await getUser(userId);
  if (user.errorMessage) {
    // TODO: handle error
  } else {
    return user.roles.includes('admin');
  }
};