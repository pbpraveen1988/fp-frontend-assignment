import React from 'react';

interface GitHubUser {
  avatar_url: string;
  login: string;
  name?: string;
}

interface GitHubProfileProps {
  user: GitHubUser;
}

const GitHubProfile: React.FC<GitHubProfileProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <div className="text-sm text-gray-500 mb-1">User Image</div>
        <img
          src={user.avatar_url}
          alt={user.name}
          className="w-24 h-24 border"
        />
      </div>
      <div>
        <div className="text-sm text-gray-500 mb-1">GitHub User Name</div>
        <p className="text-gray-900 text-lg">{user.name || user.login}</p>
      </div>
    </div>
  );
};

export default GitHubProfile; 