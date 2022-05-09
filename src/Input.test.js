import React from 'react';
import { render, screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import Input from './Input';

describe('Input component', () => {
  it('renders a labeled input', () => {
    render(
      <Input
        label="Name"
        id="name"
        type="text"
        value="Ron Swanson"
        handleChange={() => {}}
      />
    );

    const input = screen.getByRole('textbox', {name: 'Name'});

    expect(input).toBeInTheDocument();
  });

  it('calls handleChange function when user types', async () => {
    const handleChange = jest.fn();
    render(
      <Input
        label="Name"
        id="name"
        type="text"
        value="Ron Swanson"
        handleChange={handleChange}
      />
    );

    const input = screen.getByRole('textbox', {name: 'Name'});
    await userEvent.type(input, 'p');

    expect(handleChange.mock.calls.length).toBe(1);
  });

  it ('renders a select input for type="select"', () => {
    render(
      <Input
        label="Post status"
        id="postStatus"
        type="select"
        value="draft"
        options={[
          {value: '', displayName: ''},
          {value: 'draft', displayName: 'Draft'},
          {value: 'published', displayName: 'Published'}
        ]}
        handleChange={() => {}}
      />
    );

    const select = screen.getByRole('option', {name: 'Draft'});
    expect(select).toBeInTheDocument();
  });
});