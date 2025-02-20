import { useGithubStore } from '../store/githubStore';

export default function UserProfile() {
  const { user } = useGithubStore();

  if (!user) return null;

  return (
    <div className="profile">
      <img src={user.avatar_url} alt={user.login} className="avatar" />
      <h2 className="user-name">{user.name}</h2>
      <p className="username">@{user.login}</p>
      {user.bio && <p className="bio">{user.bio}</p>}
    </div>
  );
}
