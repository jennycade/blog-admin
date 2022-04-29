import React from "react";

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