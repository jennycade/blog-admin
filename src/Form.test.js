import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from './Form';

describe('Form component', () => {
  xit('renders a form with a single text input\'s label', () => {
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

  xit(`renders an editable textbox`, async () => {
    const formData = [
      {
        label: 'Name',
        id: 'name',
        type: 'text',
        value: 'Jenny',
      },
    ];

    render(<Form
      formData={formData}
    />);
    
    // type
    const field = screen.getByLabelText('Name');
    await userEvent.type(field, 'my name');

    expect(field.value).toBe('my name');
  });
});