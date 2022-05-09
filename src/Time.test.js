import React from 'react';
import { render, screen } from '@testing-library/react';

import Time from './Time';

describe('Time component', () => {
  it('shows date for 1984-03-04T22:14:10.490Z as March 3, 1984', () => {
    render(<Time dateInput='1984-03-04T22:14:10.490Z' />);
    const time = screen.getByText(/March 4, 1984/);

    expect(time).toBeInTheDocument();
  });

  it('shows time for 1984-03-04T22:14:10.490Z as 2:14 pm', () => {
    render(<Time dateInput='1984-03-04T22:14:10.490Z' />);
    const time = screen.getByText(/2:14 pm/);

    expect(time).toBeInTheDocument();
  });

  it('shows time for 1984-03-04T22:01:10.490Z as 2:01 pm', () => {
    render(<Time dateInput='1984-03-04T22:01:10.490Z' />);
    const time = screen.getByText(/2:01 pm/);

    expect(time).toBeInTheDocument();
  });
});