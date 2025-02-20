/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import axios from 'axios';

interface GithubUser {
	login: string;
	avatar_url: string;
	name: string;
	bio: string;
}

interface Repository {
	id: number;
	name: string;
	description: string;
	html_url: string;
	stargazers_count: number;
	readme?: string;
}

interface GithubStore {
	user: GithubUser | null;
	repos: Repository[];
	selectedRepo: Repository | null;
	isLoading: boolean;
	error: string | null;
	searchUser: (username: string) => Promise<void>;
	getRepos: (username: string) => Promise<void>;
	getReadme: (username: string, repo: string) => Promise<void>;
	setSelectedRepo: (repo: Repository) => void;
}

export const useGithubStore = create<GithubStore>((set) => ({
	user: null,
	repos: [],
	selectedRepo: null,
	isLoading: false,
	error: null,

	searchUser: async (username: string) => {
		try {
			set({ isLoading: true, error: null });
			const response = await axios.get(
				`/api/github?path=/users/${username}`,
			);
			set({ user: response.data });
		} catch (error) {
			set({ error: 'User tidak ditemukan' });
		} finally {
			set({ isLoading: false });
		}
	},

	getRepos: async (username: string) => {
		try {
			set({ isLoading: true, error: null });
			const response = await axios.get(
				`/api/github?path=/users/${username}/repos`,
			);
			set({ repos: response.data });
		} catch (error) {
			set({ error: 'Gagal mengambil repository' });
		} finally {
			set({ isLoading: false });
		}
	},

	getReadme: async (username: string, repo: string) => {
		try {
			set({ isLoading: true, error: null });
			console.log(
				`https://raw.githubusercontent.com/${username}/${repo}/master/README.md`,
			);
			const response = await axios.get(
				`https://raw.githubusercontent.com/${username}/${repo}/master/README.md`,
				{ responseType: 'text' },
			);

			set((state) => {
				const updatedRepos = state.repos.map((r) =>
					r.name === repo ? { ...r, readme: response.data } : r
				);
				const updatedRepo = updatedRepos.find((r) => r.name === repo);
				return {
					repos: updatedRepos,
					selectedRepo: updatedRepo || null
				};
			});
		} catch (error) {
			set({ error: 'Terjadi kesalahan saat mengambil README' });
		} finally {
			set({ isLoading: false });
		}
	},

	setSelectedRepo: (repo: Repository) => set({ selectedRepo: repo }),
}));
