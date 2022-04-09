import { useState } from 'react';

function SignInForm(props) {
  // props
  const {
    handleSignInSubmit,
  } = props;

  // state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // functions
  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    // form validation?
    if (username === '') {
      setError('Username required');
    } else if (password === '') {
      setError('Password required');
    } else {
      await handleSignInSubmit(username, password);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      { error !== '' && (
        <p role='alert' className='alert alert-danger'>
          {error}
        </p>
      )}

      <div className='mb-3'>
        <label
          htmlFor="usernameInput"
          className='form-label'
        >Username</label>
        <input
          type='text'
          className='form-control'
          id='usernameInput'
          value={username}
          onChange={onUsernameChange}
        />
      </div>

      <div className='mb-3'>
        <label
          htmlFor="passwordInput"
          className='form-label'
        >Password</label>
        <input
          type='password'
          className='form-control'
          id='passwordInput'
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <div className='mb-3'>
        <button className='btn btn-primary'>Sign in</button>
      </div>
    </form>
  );
}

export default SignInForm;