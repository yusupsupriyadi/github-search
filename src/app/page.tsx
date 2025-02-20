'use client';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepoList from './components/RepoList';
import ReadmeViewer from './components/ReadmeViewer';
import { useGithubStore } from './store/githubStore';
import './styles/style.css';

export default function Home() {
	const { user, selectedRepo, isLoading, error } = useGithubStore();

	return (
		<div className="page">
			<main className="main">
				<h1 className="title">
					GitHub Repository Explorer
				</h1>
				<SearchBar />
				{isLoading && (
					<div className="loading-text">
						<p>Sedang memuat...</p>
					</div>
				)}
				{error && (
					<div className="error-text">
						<p>{error}</p>
					</div>
				)}
				{user && (
					<div className="content">
						<div className="left-column">
							<UserProfile />
							<RepoList />
						</div>
						{selectedRepo && <ReadmeViewer />}
					</div>
				)}
			</main>
		</div>
	);
}
