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

export const signIn = async (username, password) => {
  // success: return {token, user}
  // fail: return {errorMessage}
  const response = await fetch(
    `${process.env.BACKEND_URI}/login`,
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
    return {token: json.token, user: json.user};
  }
}