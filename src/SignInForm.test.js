import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignInForm from './SignInForm';

describe('SignInForm component', () => {
  it('matches previous snapshot', () => {
    const { container } = render(<SignInForm />);
    expect(container).toMatchSnapshot();
  });

  it('shows sign in form on load', () => {
    render(<SignInForm />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('updates username when user types', async () => {
    const user = userEvent.setup();
    render(<SignInForm />);
    
    const usernameField = screen.getByLabelText('Username');
    await user.type(usernameField, 'user');

    expect(usernameField.value).toBe('user');
  });

  it('updates password when user types', async () => {
    const user = userEvent.setup();
    render(<SignInForm />);
    
    const passwordField = screen.getByLabelText('Password');
    await user.type(passwordField, 'abc123');

    expect(passwordField.value).toBe('abc123');
  });

  it('calls handleSignInSubmit() prop with username and password when sign in button is clicked', async () => {
    const user = userEvent.setup();
    // mock submit
    const handleSignInSubmit = jest.fn();
    render(<SignInForm handleSignInSubmit={handleSignInSubmit} />);

    // UI
    const usernameField = screen.getByLabelText('Username');
    const passwordField = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    // fill out form
    await user.type(usernameField, 'testuser');
    await user.type(passwordField, 'abc123');

    // submit (click)
    await user.click(submitButton);

    // assertion
    expect(handleSignInSubmit.mock.calls.length).toBe(1);
    expect(handleSignInSubmit.mock.calls[0][0]).toBe('testuser');
    expect(handleSignInSubmit.mock.calls[0][1]).toBe('abc123');
  });

  it('calls handleSignInSubmit() prop with username and password with enter key', async () => {
    const user = userEvent.setup();
    // mock submit
    const handleSignInSubmit = jest.fn();
    render(<SignInForm handleSignInSubmit={handleSignInSubmit} />);

    // UI
    const usernameField = screen.getByLabelText('Username');
    const passwordField = screen.getByLabelText('Password');

    // fill out form
    await user.type(usernameField, 'testuser');
    await user.type(passwordField, 'abc123');

    // submit (enter)
    await user.keyboard('{Enter}');

    // assertion
    expect(handleSignInSubmit.mock.calls.length).toBe(1);
    expect(handleSignInSubmit.mock.calls[0][0]).toBe('testuser');
    expect(handleSignInSubmit.mock.calls[0][1]).toBe('abc123');
  });

  // validation
  it('does not call handleSignInSubmit if username is missing', async () => {
    const user = userEvent.setup();
    // mock submit
    const handleSignInSubmit = jest.fn();
    render(<SignInForm handleSignInSubmit={handleSignInSubmit} />);

    // UI
    // const usernameField = screen.getByLabelText('Username');
    const passwordField = screen.getByLabelText('Password');

    // fill out form
    // await user.type(usernameField, 'testuser');
    await user.type(passwordField, 'abc123');

    // submit (enter)
    await user.keyboard('{Enter}');

    // assertion
    expect(handleSignInSubmit.mock.calls.length).toBe(0);
  });
  it('does not call handleSignInSubmit if password is missing', async () => {
    const user = userEvent.setup();
    // mock submit
    const handleSignInSubmit = jest.fn();
    render(<SignInForm handleSignInSubmit={handleSignInSubmit} />);

    // UI
    const usernameField = screen.getByLabelText('Username');
    // const passwordField = screen.getByLabelText('Password');

    // fill out form
    await user.type(usernameField, 'testuser');
    // await user.type(passwordField, 'abc123');

    // submit (enter)
    await user.keyboard('{Enter}');

    // assertion
    expect(handleSignInSubmit.mock.calls.length).toBe(0);
  });

  it('shows an error message with the term "username" if username is missing', async () => {
    const user = userEvent.setup();
    // mock submit
    const handleSignInSubmit = jest.fn();
    render(<SignInForm handleSignInSubmit={handleSignInSubmit} />);

    // UI
    // const usernameField = screen.getByLabelText('Username');
    const passwordField = screen.getByLabelText('Password');

    // fill out form
    // await user.type(usernameField, 'testuser');
    await user.type(passwordField, 'abc123');

    // submit (enter)
    await user.keyboard('{Enter}');

    // assertions
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toMatch(/username/i);
  });

});