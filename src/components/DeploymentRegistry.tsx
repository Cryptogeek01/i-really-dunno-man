import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Link as LinkIcon, Globe, Github, Database, CheckCircle2 } from 'lucide-react';
import { RegisteredProject } from '../types';
import { PROJECTS } from '../constants';

interface DeploymentRegistryProps {
  onRegister: (project: RegisteredProject) => void;
  registeredProjects: RegisteredProject[];
}

export const DeploymentRegistry: React.FC<DeploymentRegistryProps> = ({ onRegister, registeredProjects }) => {
  const [formData, setFormData] = useState({
    title: '',
    liveUrl: '',
    repoLink: '',
    protocolId: PROJECTS[0].id
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.liveUrl || !formData.repoLink) return;

    const newProject: RegisteredProject = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toISOString()
    };

    onRegister(newProject);
    setFormData({
      title: '',
      liveUrl: '',
      repoLink: '',
      protocolId: PROJECTS[0].id
    });
  };

  return (
    <div className="space-y-8">
      <div className="glass p-8 rounded-2xl border-accent/10">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <Plus size={20} className="text-accent" />
          Register Deployment
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Project Title</label>
            <input
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-accent/50 transition-colors"
              placeholder="e.g. Subzero Explorer"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Protocol Category</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-accent/50 transition-colors appearance-none"
              value={formData.protocolId}
              onChange={e => setFormData({ ...formData, protocolId: e.target.value })}
            >
              {PROJECTS.map(p => (
                <option key={p.id} value={p.id} className="bg-zinc-900">{p.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Live URL</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
              <input
                required
                type="url"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-accent/50 transition-colors"
                placeholder="https://app.example.com"
                value={formData.liveUrl}
                onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">GitHub Repo Link</label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
              <input
                required
                type="url"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-accent/50 transition-colors"
                placeholder="https://github.com/user/repo"
                value={formData.repoLink}
                onChange={e => setFormData({ ...formData, repoLink: e.target.value })}
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2"
            >
              <Database size={18} />
              REGISTER PROOF OF WORK
            </button>
          </div>
        </form>
      </div>

      {registeredProjects.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-sm font-mono uppercase text-zinc-500 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-accent" /> My Portfolio
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {registeredProjects.map((project) => (
              <div key={project.id} className="glass p-5 rounded-xl border-white/5 hover:border-accent/20 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-white group-hover:text-accent transition-colors">{project.title}</h4>
                  <span className="text-[9px] font-mono bg-accent/10 text-accent px-1.5 py-0.5 rounded uppercase">
                    {PROJECTS.find(p => p.id === project.protocolId)?.name}
                  </span>
                </div>
                <div className="flex gap-4 mt-4">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                    <LinkIcon size={14} />
                  </a>
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                    <Github size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
