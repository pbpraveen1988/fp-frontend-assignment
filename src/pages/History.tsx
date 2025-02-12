import React from 'react';
import GitHubProfile from '../components/GitHubProfile';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearHistory } from '../store/userSlice';

const History = () => {
  const dispatch = useDispatch();
  const searchHistory = useSelector((state: RootState) => state.user.searchHistory);

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h2 className="text-center text-xl mb-6">Your Search History</h2>
      
      {searchHistory.length > 0 ? (
        <>
          <div className="border border-gray-200 bg-gray-50">
            <div className="grid grid-cols-5 border-b">
              <div className="text-sm text-gray-500 p-4 border-r col-span-2">Username</div>
              <div className="text-sm text-gray-500 p-4 col-span-3">Profile</div>
            </div>

            <div className="bg-white">
              {searchHistory.map((user) => (
                <div key={user.id} className="grid grid-cols-5 border-b last:border-b-0">
                  <div className="p-4 border-r col-span-2">{user.login}</div>
                  <div className="p-4 col-span-3">
                    <GitHubProfile user={user} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => dispatch(clearHistory())}
              className="px-6 py-2 bg-secondary text-white"
            >
              Clear Search History
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-8 border bg-white">
          <p className="text-gray-500">No search history found</p>
        </div>
      )}
    </div>
  );
};

export default History; 