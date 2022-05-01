import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from './Form';

describe('Form component', () => {
  it('renders a form with a single text input\'s label', () => {
    const formData = [{
      label: 'Name',
      id: 'name',
      type: 'text',
      value: 'Jenny',
    }];

    render(<Form
      formData={formData}
    />);
    
    expect(screen.getByLabelText('Name')).toBeInTheDocument();

  });
});