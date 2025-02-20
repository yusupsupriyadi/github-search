import { NextResponse } from 'next/server';

const GITHUB_API_BASE = 'https://api.github.com';
const headers = {
	Accept: 'application/vnd.github.raw+json',
	Authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
	'X-GitHub-Api-Version': '2022-11-28',
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const path = searchParams.get('path');
	const type = searchParams.get('type');

	if (!path) {
		return NextResponse.json(
			{ error: 'Path is required' },
			{ status: 400 },
		);
	}

	try {
		const response = await fetch(`${GITHUB_API_BASE}${path}`, {
			headers:
				type === 'raw'
					? { ...headers, Accept: 'application/vnd.github.raw' }
					: headers,
		});

		if (!response.ok) {
			if (response.status === 404) {
				return NextResponse.json(
					{ error: 'Repository atau file tidak ditemukan' },
					{ status: 404 },
				);
			}
			throw new Error(`GitHub API request failed: ${response.statusText}`);
		}

		// Jika type adalah 'raw', kembalikan teks mentah
		if (type === 'raw') {
			const text = await response.text();
			return new NextResponse(text, {
				headers: { 'Content-Type': 'text/plain' },
			});
		}

		// Untuk request lainnya, kembalikan JSON
		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('GitHub API Error:', error);
		return NextResponse.json(
			{ error: `Gagal mengambil data dari GitHub: ${error}` },
			{ status: 500 },
		);
	}
}
