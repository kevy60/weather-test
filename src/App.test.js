import { render, screen } from '@testing-library/react';
import App from './App';

describe('renders weather application title', () => {
  it('renders weather application title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Weather Application/i);
  expect(linkElement).toBeInTheDocument();
});
})
