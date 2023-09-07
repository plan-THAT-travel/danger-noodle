import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

afterEach(cleanup);

describe('Login', () => {
  it('should render Login component correctly', () => {
    render(<Login />)
    const heading = screen.getByText('Plan It Travel');
    expect(heading).toBeInTheDocument();
  });
});
