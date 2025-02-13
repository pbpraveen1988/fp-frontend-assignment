import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../store/userSlice';
import History from '../History';

describe('History Page', () => {
  const mockUser = {
    id: '1',
    login: 'testuser',
    name: 'Test User',
    avatar_url: 'https://test.com/avatar.jpg',
  };

  const createMockStore = (initialState = { searchHistory: [] }) => {
    return configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: {
          currentUser: null,
          searchHistory: initialState.searchHistory,
        },
      },
    });
  };

  it('renders empty state message when no history', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <History />
      </Provider>
    );
    expect(screen.getByText('No search history found')).toBeInTheDocument();
  });

  it('renders search history when available', () => {
    const store = createMockStore({
      searchHistory: [mockUser],
    });

    render(
      <Provider store={store}>
        <History />
      </Provider>
    );

    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });

  it('clears history when clear button is clicked', () => {
    const store = createMockStore({
      searchHistory: [mockUser],
    });

    render(
      <Provider store={store}>
        <History />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /clear search history/i }));
    expect(screen.getByText('No search history found')).toBeInTheDocument();
  });
}); 