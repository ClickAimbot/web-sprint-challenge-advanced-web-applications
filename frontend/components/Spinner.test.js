import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

test('renders a default spinner', () => {
  render (<Spinner />);
});
