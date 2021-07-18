import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import LoginForm from './LoginForm';

test('shows Username input when rendered', () => {
  const url = 'http://localhost';
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { assign: url }
  });
  const { getByText } = render(LoginForm)

  expect(getByText('Username')).toBeInTheDocument()
})
