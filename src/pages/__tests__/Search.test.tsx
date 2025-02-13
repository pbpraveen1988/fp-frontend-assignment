import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../store/userSlice';
import Search from '../Search';

const mockStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

describe('Search Page', () => {
  const renderSearch = () => {
    render(
      <Provider store={mockStore}>
        <Search />
      </Provider>
    );
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('renders search input and button', () => {
    renderSearch();
    expect(screen.getByPlaceholderText('Search GitHub User')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('handles empty search', () => {
    renderSearch();
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeDisabled();
  });

  it('handles user search', async () => {
    const mockUser = {
      id: '1',
      login: 'testuser',
      name: 'Test User',
      avatar_url: 'https://test.com/avatar.jpg',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    renderSearch();
    
    const input = screen.getByPlaceholderText('Search GitHub User');
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });
  });

  it('handles search error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Not found' }),
    });

    renderSearch();
    
    const input = screen.getByPlaceholderText('Search GitHub User');
    fireEvent.change(input, { target: { value: 'nonexistentuser' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText('Search result not found')).toBeInTheDocument();
    });
  });
}); 