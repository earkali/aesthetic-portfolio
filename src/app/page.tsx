"use client";
import { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

// Environment variables for configuration
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'example-user';
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || 'your_github_token_here';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'your-email@example.com';
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/your-profile';

const linkedInInfo = {
  linkedin: LINKEDIN_URL,
  github: `https://github.com/${GITHUB_USERNAME}`,
};

const ICONS = [
  {
    icon: FaLinkedin,
    href: linkedInInfo.linkedin,
    label: 'LinkedIn',
    color: 'hover:text-blue-400',
  },
  {
    icon: FaGithub,
    href: linkedInInfo.github,
    label: 'GitHub',
    color: 'hover:text-gray-300',
  },
  {
    icon: FaEnvelope,
    href: `mailto:${CONTACT_EMAIL}`,
    label: 'Email',
    color: 'hover:text-pink-400',
  },
];

const BACKGROUNDS = [
  "/background1.png",
  "/background2.png",
  "/background3.png",
  "/background4.png",
];

const LINKEDIN_SUMMARY = `Major in Computer Engineering. Passionate about software development, AI, and technology. Always eager to learn and grow. Experienced in various programming languages and frameworks. Open to new opportunities and collaborations.`;

const FALLBACK_IMAGE = "/fallback.jpg";

// Developer signature component
function DeveloperSignature() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://github.com/earkali"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white transition-all duration-200 hover:scale-105"
      >
        <span>Made with ❤️ by</span>
        <span className="font-semibold text-pink-400">@earkali</span>
        <FaGithub className="text-lg" />
      </a>
    </div>
  );
}

type Repo = {
  id: number;
  name: string;
  owner: { login: string };
  description?: string;
  private?: boolean;
  language?: string;
  stargazers_count: number;
  forks_count: number;
};

type File = {
  sha: string;
  name: string;
  type: string;
};

function RepoModal({ repo, onClose }: { repo: Repo; onClose: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileLoading, setFileLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setSelectedFile(null);
      setFileContent(null);
      const filesRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      });
      const filesData = await filesRes.json();
      setFiles(filesData);
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`, {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3.raw',
          },
        });
        if (readmeRes.ok) {
          const readmeText = await readmeRes.text();
          setReadme(readmeText);
        } else {
          setReadme(null);
        }
      } catch {
        setReadme(null);
      }
      setLoading(false);
    }
    fetchData();
  }, [repo]);

  useEffect(() => {
    // Modal açıldığında body scroll'u kapat
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  async function handleFileClick(file: File) {
    if (file.type !== 'file') return;
    setSelectedFile(file);
    setFileContent(null);
    setFileLoading(true);
    try {
      const res = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/${file.name}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      });
      const data = await res.json();
      if (data && data.content) {
        // UTF-8 decode
        const binary = atob(data.content.replace(/\n/g, ''));
        const bytes = new Uint8Array([...binary].map(char => char.charCodeAt(0)));
        const decoded = new TextDecoder('utf-8').decode(bytes);
        setFileContent(decoded);
      } else {
        setFileContent('Unable to display file content.');
      }
    } catch {
      setFileContent('Unable to display file content.');
    }
    setFileLoading(false);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadein">
      <div className="bg-gray-900/95 rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative text-gray-100 backdrop-blur-md border-2 border-blue-900/60">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-pink-400 transition">&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-pink-200 tracking-wider">{repo.name}</h2>
        {loading ? (
          <div className="text-center text-lg text-gray-300">Loading...</div>
        ) : (
          <>
            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-blue-200">Files</h3>
              <ul className="list-disc list-inside text-sm mb-2">
                {files.map((file: File) => (
                  <li key={file.sha}>
                    {file.type === 'file' ? (
                      <button
                        className={`text-blue-400 hover:underline font-mono bg-transparent border-0 p-0 cursor-pointer`}
                        onClick={() => handleFileClick(file)}
                      >
                        {file.name}
                      </button>
                    ) : (
                      <span className="text-gray-400 font-mono">{file.name} (dir)</span>
                    )}
                  </li>
                ))}
              </ul>
              {fileLoading && <div className="text-gray-400">Loading file...</div>}
              {selectedFile && fileContent && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 text-blue-300">{selectedFile.name}</h4>
                  <pre className="overflow-x-auto bg-gradient-to-br from-gray-800/90 to-gray-900/80 p-5 rounded-xl text-sm whitespace-pre-wrap max-h-96 text-blue-100 border border-blue-700/60 shadow-inner font-mono leading-relaxed tracking-wide" style={{ fontFamily: `'Fira Mono', 'JetBrains Mono', 'Consolas', 'Menlo', 'monospace'`, direction: 'ltr' }}>
                    {fileContent}
                  </pre>
                </div>
              )}
            </div>
            {readme && (
              <div>
                <h3 className="font-semibold mb-2 text-blue-200">README.md</h3>
                <pre className="overflow-x-auto bg-gradient-to-br from-gray-800/90 to-gray-900/80 p-5 rounded-xl text-sm whitespace-pre-wrap max-h-96 text-blue-100 border border-blue-700/60 shadow-inner font-mono leading-relaxed tracking-wide" style={{ fontFamily: `'Fira Mono', 'JetBrains Mono', 'Consolas', 'Menlo', 'monospace'`, direction: 'ltr' }}>{readme}</pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PortfolioSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true);
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      });
      const data = await res.json();
      setRepos(data);
      setLoading(false);
    }
    fetchRepos();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      {loading ? (
        <div className="text-center text-lg text-gray-200">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo: Repo) => (
            <button
              key={repo.id}
              className="bg-gray-900/80 border border-gray-700 rounded-xl p-5 shadow-lg flex flex-col gap-2 transition hover:scale-[1.03] text-left cursor-pointer"
              onClick={() => setSelectedRepo(repo)}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-semibold text-white">{repo.name}</span>
                {repo.private && <span className="text-xs text-gray-400">Private</span>}
              </div>
              <p className="text-gray-300 text-sm mb-2 min-h-[40px]">{repo.description || <span className="italic text-gray-500">No description</span>}</p>
              <div className="flex gap-4 text-xs text-gray-400 mt-auto">
                {repo.language && <span>{repo.language}</span>}
                <span>★ {repo.stargazers_count}</span>
                <span>Forks: {repo.forks_count}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      {selectedRepo && <RepoModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />}
    </div>
  );
}

function Section({ bg, children, index, activeIndex }: { bg: string; children: React.ReactNode; index: number; activeIndex: number }) {
  if (Math.abs(index - activeIndex) > 1) return null;
  return (
    <div
      className={`fixed inset-0 w-full h-full flex items-center justify-center transition-opacity duration-700 ${index === activeIndex ? 'opacity-100 z-20' : 'opacity-0 z-10 pointer-events-none'}`}
    >
      <img
        src={bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-20 select-none border-2 border-gray-800"
        draggable={false}
        onError={e => {
          const target = e.target as HTMLImageElement;
          if (target.src !== window.location.origin + FALLBACK_IMAGE && !target.src.endsWith(FALLBACK_IMAGE)) {
            target.src = FALLBACK_IMAGE;
          }
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/80 to-black/90 z-0" />
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [section, setSection] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? scrollY / docHeight : 0;
      const idx = Math.min(BACKGROUNDS.length - 1, Math.floor(percent * BACKGROUNDS.length));
      setSection(idx);
    };
    window.addEventListener('scroll', onScroll);
    setPageHeight(window.innerHeight * BACKGROUNDS.length);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: (section * window.innerHeight), behavior: 'smooth' });
    }
  }, [section]);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden overflow-y-auto" style={{ minHeight: '100vh' }}>
      <Section bg={BACKGROUNDS[0]} index={0} activeIndex={section}>
        <h1 className="text-5xl md:text-6xl font-bold tracking-widest mb-4 text-white select-none" style={{letterSpacing: '0.25em'}}>Your Name</h1>
        <div className="text-2xl md:text-3xl text-gray-200 font-semibold mb-2 tracking-widest" style={{letterSpacing: '0.18em'}}>Computer Engineer</div>
      </Section>
      <Section bg={BACKGROUNDS[1]} index={1} activeIndex={section}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">About Me</h2>
          <p className="text-lg md:text-xl text-gray-100 font-medium leading-relaxed whitespace-pre-line">{LINKEDIN_SUMMARY}</p>
        </div>
      </Section>
      <Section bg={BACKGROUNDS[2]} index={2} activeIndex={section}>
        <h2 className="text-3xl font-bold mb-8 text-white">Portfolio</h2>
        <PortfolioSection />
      </Section>
      <Section bg={BACKGROUNDS[3]} index={3} activeIndex={section}>
        <h2 className="text-3xl font-bold mb-8 text-white">Links</h2>
        <div className="flex gap-12 items-center justify-center mt-2 z-10">
          {ICONS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-transform duration-200 ${item.color} text-white text-4xl hover:scale-125 focus:scale-125 focus:outline-none`}
                tabIndex={0}
                aria-label={item.label}
                style={{ pointerEvents: 'auto' }}
              >
                <Icon size={44} />
              </a>
            );
          })}
        </div>
      </Section>
      <div style={{ height: pageHeight ? `${pageHeight}px` : '400vh' }} />
      <DeveloperSignature />
    </div>
  );
}
