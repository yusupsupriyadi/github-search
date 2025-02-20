import { useGithubStore } from '../store/githubStore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ReadmeViewer() {
  const { selectedRepo } = useGithubStore();

  if (!selectedRepo || !selectedRepo.readme) return null;

  return (
    <div className="readme-container">
      <h2 className="readme-title">{selectedRepo.name} README</h2>
      <div className="readme-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {selectedRepo.readme}
        </ReactMarkdown>
      </div>
    </div>
  );
}
