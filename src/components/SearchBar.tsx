import { useState } from 'react';
import styles from '../styles/SearchBar.module.css';
import { useGithubStore } from '@/store/githubStore';

export default function SearchBar() {
  const [username, setUsername] = useState('');
  const { searchUser, getRepos } = useGithubStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      await searchUser(username);
      await getRepos(username);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Masukkan username GitHub"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Cari
      </button>
    </form>
  );
}
