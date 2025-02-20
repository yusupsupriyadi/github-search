import { useGithubStore } from '../store/githubStore';

export default function RepoList() {
	const { repos, getReadme, setSelectedRepo, user } = useGithubStore();

	const handleRepoClick = async (username: string, repoName: string) => {
		const repo = repos.find((r) => r.name === repoName);
		if (repo) {
			setSelectedRepo(repo);
			await getReadme(username, repoName);
		}
	};

	return (
		<div className='repo-list'>
			{repos.map((repo) => (
				<div
					key={repo.id}
					className='repo-card'
					onClick={() =>
						handleRepoClick(user?.login || '', repo.name)
					}>
					<h3 className='repo-name'>{repo.name}</h3>
					{repo.description && (
						<p className='repo-description'>{repo.description}</p>
					)}
					<div className='repo-stats'>
						<span>⭐ {repo.stargazers_count}</span>
					</div>
				</div>
			))}
		</div>
	);
}
