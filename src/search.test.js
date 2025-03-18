import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from './components/Search';

describe('Search component tests', () => {
  it('updates query state on input change', () => {
    const setQuery = jest.fn();
    render(<Search query="" setQuery={setQuery} searchResults={[]} setsearchResults={jest.fn()} selectCity={jest.fn()} />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Melbourne' } });

    expect(setQuery).toHaveBeenCalledWith('Melbourne');
  });

  it('fetches and displays search results on button click', async () => {
    const setsearchResults = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { name: 'Melbourne', country: 'Australia', lat: -37.814, lon: 144.96332 },
          { name: 'Melbourne', country: 'USA', lat: 28.0836, lon: -80.6081 }
        ]),
      })
    );

    render(<Search query="Melbourne" setQuery={jest.fn()} searchResults={[]} setsearchResults={setsearchResults} selectCity={jest.fn()} />);

    const button = screen.getByTestId('search-button');
    fireEvent.click(button);

    await waitFor(() => expect(setsearchResults).toHaveBeenCalledWith([
      { name: 'Melbourne', country: 'Australia', lat: -37.814, lon: 144.96332 },
      { name: 'Melbourne', country: 'USA', lat: 28.0836, lon: -80.6081 }
    ]));
  });
});