import React, { useState, KeyboardEvent } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import GitHubProfile from '../components/GitHubProfile';
import { useDispatch } from 'react-redux';
import { addToHistory } from '../store/userSlice';
import { User } from '../types';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    setSearched(false);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        dispatch(addToHistory(data));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    }
    setLoading(false);
    setSearched(true);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && username.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4">
      <h2 className="text-center text-xl mb-6">Search GitHub User</h2>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search GitHub User"
            className="w-full p-2 pl-10 border"
          />
          <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!username.trim() || loading}
          className={`w-full py-2 text-white ${
            username.trim() ? 'bg-secondary' : 'bg-gray-300'
          }`}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>

        {!loading && searched && (
          <div className="w-full">
            <h3 className="text-sm text-gray-500 mb-2">Search Results</h3>
            <div className="border">
              <div className="p-4">
                {user ? (
                  <GitHubProfile user={user} />
                ) : (
                  <span className="text-gray-500">Search result not found</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 