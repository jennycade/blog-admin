import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// router
import { StaticRouter } from 'react-router-dom/server';

import Form from './Form';

describe('Form component', () => {
  // MAYBE TODO: Only show warning if inputs have changed
  it(`Shows a warning when user clicks the cancel button`, async () => {
    render(<Form leaveForm={() => {}} />);
    const cancelButton = screen.getByRole('button', {name: /cancel/i});
    await userEvent.click(cancelButton);

    const warning = screen.getByText(/are you sure/i);
    expect(warning).toBeInTheDocument();
  });

  it(`Lets user cancel leaving the form`, async () => {
    render(<Form leaveForm={() => {}} />);
    const cancelButton = screen.getByRole('button', {name: /cancel/i});
    await userEvent.click(cancelButton);

    // cancel canceling
    const goBackButton = screen.getByRole('button', {name: /stay/i});
    await userEvent.click(goBackButton);

    // dismisses dialog, form still there
    expect(cancelButton).toBeInTheDocument();
    expect(goBackButton).not.toBeInTheDocument();
  });

  it(`Lets user leave the form`, async () => {
    const leaveForm = jest.fn();
    render(<Form leaveForm={leaveForm} />);
    const cancelButton = screen.getByRole('button', {name: /cancel/i});
    await userEvent.click(cancelButton);

    // really do cancel
    const continueButton = screen.getByRole('button', {name: /yes/i});
    await userEvent.click(continueButton);

    // calls fn to close form
    expect(leaveForm.mock.calls.length).toBe(1);
  });

  it(`Lets user leave the form with a link when leaveForm is a path`, async () => {
    const path = '/posts';
    render((
      <StaticRouter>
        <Form leaveForm={path} />
      </StaticRouter>
    ));
    const cancelButton = screen.getByRole('button', {name: /cancel/i});
    await userEvent.click(cancelButton);

    // the link
    const cancelLink = screen.getByRole('link', {name: /yes/i});
    expect(cancelLink).toBeInTheDocument();
  });
});