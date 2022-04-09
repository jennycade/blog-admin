import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  // it('matches previous snapshot', () => {
  //   const { container } = render(<App />);
  //   expect(container).toMatchSnapshot();
  // });

  // it('renders radical rhinos after button click', () => {
  //   // get button to click
  //   render(<App />);
  //   const button = screen.getByRole('button', { name: 'Click Me'});

  //   // click it
  //   userEvent.click(button);

  //   // changes heading
  //   expect(screen.getByRole('heading').textContent).toMatch(/radical rhinos/i);
  // });

  it('shows sign in form on load', () => {
    render(<App />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});