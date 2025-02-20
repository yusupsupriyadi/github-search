# GitHub Repository Explorer

A modern web application built with Next.js that allows users to explore GitHub repositories and their contents. This application provides an intuitive interface to search for GitHub users, view their repositories, and read repository README files.

## Features

- 🔍 Search for GitHub users
- 👤 View user profiles with avatar and bio
- 📚 Browse user repositories with descriptions and star counts
- 📖 Read repository README files in a clean format
- 🌙 Dark mode support
- 📱 Fully responsive design
- ⚡ Fast and efficient with server-side API handling

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: Pure CSS with CSS Modules
- **API**: GitHub REST API

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.17 or later
- A GitHub Personal Access Token (for API access)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd github-search
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
GITHUB_TOKEN=your_github_personal_access_token
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
github-search/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── github/
│   │   │       └── route.ts      # GitHub API proxy endpoints
│   │   ├── favicon.ico           # Website favicon
│   │   ├── layout.tsx            # Root layout component
│   │   ├── opengraph-image.png   # OpenGraph image for social sharing
│   │   └── page.tsx              # Main application page
│   ├── components/               # Reusable React components
│   │   ├── SearchBar.tsx         # User search component
│   │   ├── UserProfile.tsx       # User profile display
│   │   ├── RepoList.tsx          # Repository list component
│   │   └── ReadmeViewer.tsx      # README content viewer
│   ├── store/                    # State management
│   │   └── githubStore.ts        # Zustand store configuration
│   └── styles/                   # Styling
│       ├── globals.css           # Global styles
│       ├── SearchBar.module.css  # Search bar styles
│       ├── UserProfile.module.css # User profile styles
│       ├── RepoList.module.css   # Repository list styles
│       ├── ReadmeViewer.module.css # README viewer styles
│       └── page.module.css       # Main page styles
├── public/                       # Static assets
├── .env.local                    # Environment variables
└── package.json                  # Project dependencies and scripts
```

## API Integration

The application uses the GitHub REST API v3 with the following endpoints:
- `/users/{username}` - Get user information
- `/users/{username}/repos` - List user repositories
- `/repos/{owner}/{repo}/readme` - Get repository README

All API requests are proxied through Next.js API routes to secure the GitHub token.

## State Management

Zustand is used for state management with the following store structure:
- `user`: Current GitHub user data
- `repos`: List of user repositories
- `selectedRepo`: Currently selected repository
- `isLoading`: Loading state indicator
- `error`: Error message state

## Styling

The application uses CSS Modules for component-specific styling with:
- Responsive grid layouts
- Flexbox for component alignment
- CSS variables for theming
- Media queries for responsive design

## Performance Optimization

- Server-side API request handling
- Efficient state management with Zustand
- Optimized images and fonts
- Lazy loading for README content
- Responsive design practices

## Error Handling

The application implements comprehensive error handling:
- API request failures
- User not found scenarios
- Repository access errors
- README parsing issues

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- GitHub for their comprehensive API
- Zustand team for the state management solution
