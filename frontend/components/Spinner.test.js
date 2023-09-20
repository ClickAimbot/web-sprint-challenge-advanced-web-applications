import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

test('renders a default spinner', () => {
  const { getByTestId } = render(<Spinner />);
  const spinner = getByTestId('spinner');

  expect(spinner).toBeInTheDocument();
});

test('renders a spinner with custom size', () => {
  const { getByTestId } = render(<Spinner size={30} />);
  const spinner = getByTestId('spinner');

  expect(spinner).toBeInTheDocument();
});

test('renders a spinner with custom color', () => {
  const { getByTestId } = render(<Spinner color="blue" />);
  const spinner = getByTestId('spinner');

  expect(spinner).toBeInTheDocument();
});

