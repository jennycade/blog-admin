import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  it('renders magnificent monkeys', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it('renders radical rhinos after button click', () => {
    // get button to click
    render(<App />);
    const button = screen.getByRole('button', { name: 'Click Me'});

    // click it
    userEvent.click(button);

    // changes heading
    expect(screen.getByRole('heading').textContent).toMatch(/radical rhinos/i);
  });
});