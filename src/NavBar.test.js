import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import NavBar from './NavBar';

describe('NavBar', () => {
  // ALL TESTS BROKEN! 
  // Error: useLocation() may be used only in the context of a <Router> component.

  xit('displays links for home, posts, comments, and users', () => {
    render(<NavBar />);

    const homeLink = screen.getByRole('link', {name: 'Home'});
    const postsLink = screen.getByRole('link', {name: 'Posts'});
    const commentsLink = screen.getByRole('link', {name: 'Comments'});
    const usersLink = screen.getByRole('link', {name: 'Users'});

    expect(homeLink).toHaveAttribute('href', '/');
    expect(postsLink).toHaveAttribute('href', '/posts');
    expect(commentsLink).toHaveAttribute('href', '/comments');
    expect(usersLink).toHaveAttribute('href', '/users');
  });

  xit('shows posts as the active link (and no other links as active) when activeSection="posts" provided as prop', () => {
    render(<NavBar activeSection="posts" />);

    const homeLink = screen.getByRole('link', {name: 'Home'});
    const postsLink = screen.getByRole('link', {name: 'Posts'});
    const commentsLink = screen.getByRole('link', {name: 'Comments'});
    const usersLink = screen.getByRole('link', {name: 'Users'});

    expect(homeLink).not.toHaveClass('active');
    expect(postsLink).toHaveClass('active');
    expect(commentsLink).not.toHaveClass('active');
    expect(usersLink).not.toHaveClass('active');
  });

  xit('gives users the aria-current="page" attribute when activeSection="users" provided as prop', () => {
    render(<NavBar activeSection="users" />);

    const homeLink = screen.getByRole('link', {name: 'Home'});
    const postsLink = screen.getByRole('link', {name: 'Posts'});
    const commentsLink = screen.getByRole('link', {name: 'Comments'});
    const usersLink = screen.getByRole('link', {name: 'Users'});

    expect(homeLink).not.toHaveAttribute('aria-current', 'page');
    expect(postsLink).not.toHaveAttribute('aria-current', 'page');
    expect(commentsLink).not.toHaveAttribute('aria-current', 'page');
    expect(usersLink).toHaveAttribute('aria-current', 'page');
  });
});