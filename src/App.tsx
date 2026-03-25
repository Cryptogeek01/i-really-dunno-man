import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectCard } from './components/ProjectCard';
import { SkillMatrix } from './components/SkillMatrix';
import { LiveOps } from './components/LiveOps';
import { TheLab } from './components/TheLab';
import { CommandPalette } from './components/CommandPalette';
import { SyncProfileModal } from './components/SyncProfileModal';
import { DeploymentRegistry } from './components/DeploymentRegistry';
import { PROJECTS, SKILLS } from './constants';
import { Terminal, FlaskConical, Radio, Command as CommandIcon, LayoutGrid, Github, Sun, Moon, ExternalLink, ShieldCheck } from 'lucide-react';
import { Theme, GitHubProfile, RegisteredProject } from './types';

type View = 'builder' | 'live' | 'lab';

export default function App() {
  const [view, setView] = useState<View>(() => {
    const saved = localStorage.getItem('current_view');
    return (saved as View) || 'builder';
  });
  
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });

  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(() => {
    const saved = localStorage.getItem('github_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [registeredProjects, setRegisteredProjects] = useState<RegisteredProject[]>(() => {
    const saved = localStorage.getItem('registered_projects');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('current_view', view);
  }, [view]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    if (githubProfile) {
      localStorage.setItem('github_profile', JSON.stringify(githubProfile));
    }
  }, [githubProfile]);

  useEffect(() => {
    localStorage.setItem('registered_projects', JSON.stringify(registeredProjects));
  }, [registeredProjects]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleCommand = (action: string) => {
    if (action === 'open') setIsCommandPaletteOpen(true);
    if (action === 'builder') setView('builder');
    if (action === 'live') setView('live');
    if (action === 'lab') setView('lab');
  };

  const handleRegisterProject = (project: RegisteredProject) => {
    setRegisteredProjects(prev => [project, ...prev]);
  };

  return (
    <div className="min-h-screen data-grid pb-24 selection:bg-accent selection:text-black transition-colors duration-300">
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
        onSelect={handleCommand}
      />

      <SyncProfileModal 
        isOpen={isSyncModalOpen} 
        onClose={() => setIsSyncModalOpen(false)} 
        onSync={setGithubProfile} 
      />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-lg shadow-[0_0_10px_rgba(57,255,20,0.4)]">
                <Terminal className="text-black" size={18} />
              </div>
              <span className="font-mono text-xs tracking-widest text-ink uppercase font-bold hidden md:block">
                Position Pulse <span className="text-accent">v3.2</span>
              </span>
            </div>

            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setView('builder')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  view === 'builder' ? 'bg-accent text-black font-bold' : 'text-zinc-500 hover:text-ink'
                }`}
              >
                <LayoutGrid size={14} /> BUILDER
              </button>
              <button 
                onClick={() => setView('live')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  view === 'live' ? 'bg-accent text-black font-bold' : 'text-zinc-500 hover:text-ink'
                }`}
              >
                <Radio size={14} /> LIVE OPS
              </button>
              <button 
                onClick={() => setView('lab')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  view === 'lab' ? 'bg-accent text-black font-bold' : 'text-zinc-500 hover:text-ink'
                }`}
              >
                <FlaskConical size={14} /> THE LAB
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/5 border border-white/5 text-zinc-500 hover:text-accent transition-all"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={() => setIsSyncModalOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-xs font-mono ${
                githubProfile 
                  ? 'bg-accent/10 border-accent/30 text-accent' 
                  : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white hover:border-accent/30'
              }`}
            >
              <Github size={16} />
              {githubProfile ? `@${githubProfile.username}` : 'SYNC PROFILE'}
            </button>

            <button 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-zinc-500 hover:text-ink hover:border-accent/30 transition-all group hidden md:flex"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest group-hover:text-accent">Initialize Session</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 rounded text-[10px] font-mono">
                <CommandIcon size={10} /> K
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="pt-32 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'builder' && (
            <motion.div
              key="builder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.9] text-ink uppercase italic">
                  PROOF OF <br />
                  <span className="text-accent">WORK.</span>
                </h1>
                <p className="text-zinc-500 text-lg leading-relaxed font-mono uppercase tracking-tight">
                  High-performance developer dashboard for builders navigating the next wave of infrastructure.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-3">
                      <div className="w-8 h-[1px] bg-accent/30" />
                      Infrastructure Core
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PROJECTS.map((project) => (
                      <ProjectCard 
                        key={project.id} 
                        project={project} 
                        profile={githubProfile}
                        isActive={registeredProjects.some(p => p.protocolId === project.id)}
                      />
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-12">
                  <SkillMatrix skills={SKILLS} profile={githubProfile} />
                  
                  <div className="glass p-8 rounded-2xl border-white/5 space-y-6">
                    <h3 className="text-sm font-mono uppercase text-zinc-500 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-accent" /> PoW Verification
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-xs font-mono text-zinc-400">GitHub Sync</span>
                        {githubProfile ? <span className="text-[10px] font-mono text-accent">ACTIVE</span> : <span className="text-[10px] font-mono text-zinc-600">PENDING</span>}
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-xs font-mono text-zinc-400">Verified Repos</span>
                        <span className="text-[10px] font-mono text-accent">{githubProfile?.repos.length || 0}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-xs font-mono text-zinc-400">Deployments</span>
                        <span className="text-[10px] font-mono text-accent">{registeredProjects.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5">
                <DeploymentRegistry onRegister={handleRegisterProject} registeredProjects={registeredProjects} />
              </div>
            </motion.div>
          )}

          {view === 'live' && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <LiveOps />
            </motion.div>
          )}

          {view === 'lab' && (
            <motion.div
              key="lab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TheLab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-status-bar-bg border-t border-white/5 h-8 flex items-center justify-between px-6">
        <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest">
          <div className="flex items-center gap-2 text-zinc-500">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            System Status: <span className="text-accent">Optimal</span>
          </div>
          <div className="text-zinc-600 hidden md:block">
            Uptime: 99.99%
          </div>
          <div className="text-zinc-600 hidden md:block">
            Latency: 12ms
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest">
          <a 
            href="https://x.com/0x_cgweb3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-accent transition-colors flex items-center gap-1"
          >
            ENGINEERED BY @0x_cgweb3 <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}
