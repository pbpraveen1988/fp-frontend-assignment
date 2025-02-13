import React from 'react';
import { render, screen } from '@testing-library/react';
import GitHubProfile from '../GitHubProfile';

describe('GitHubProfile Component', () => {
  const mockUser = {
    id: '1',
    login: 'testuser',
    name: 'Test User',
    avatar_url: 'https://test.com/avatar.jpg',
    html_url: 'https://github.com/testuser',
    public_repos: 10,
    followers: 20,
    following: 30,
    bio: 'Test bio',
    location: 'Test location',
    created_at: '2020-01-01T00:00:00Z',
  };

  it('renders user profile information', () => {
    render(<GitHubProfile user={mockUser} />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument()
  });

  
}); 