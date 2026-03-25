import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, X, Search, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { GitHubProfile } from '../types';

interface SyncProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSync: (profile: GitHubProfile) => void;
}

export const SyncProfileModal: React.FC<SyncProfileModalProps> = ({ isOpen, onClose, onSync }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    if (!username) return;
    setIsLoading(true);
    setError(null);

    try {
      // Fetch user repos
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
      if (!reposRes.ok) throw new Error('User not found');
      const repos = await reposRes.json();

      // Aggregate languages
      const languages: { [key: string]: number } = {};
      repos.forEach((repo: any) => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });

      const profile: GitHubProfile = {
        username,
        avatarUrl: repos[0]?.owner?.avatar_url,
        repos,
        languages,
        scannedAt: new Date().toISOString()
      };

      onSync(profile);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md glass rounded-2xl overflow-hidden shadow-2xl border-accent/20 p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Github size={20} className="text-accent" />
                Sync GitHub Profile
              </h2>
              <button onClick={onClose} className="text-zinc-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
              Enter your GitHub username to scan your public repositories and verify your builder status across core protocols.
            </p>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  autoFocus
                  placeholder="GitHub Username"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-accent/50 transition-colors"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSync()}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-xs bg-red-500/10 p-3 rounded-lg">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}

              <button
                disabled={isLoading || !username}
                onClick={handleSync}
                className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    SCANNING REPOS...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    INITIALIZE SCAN
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 text-[10px] font-mono text-zinc-600 uppercase tracking-widest text-center">
              No OAuth required. Public data only.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
