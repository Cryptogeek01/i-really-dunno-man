import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Twitter, Github, ChevronRight, Zap, Activity } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`glass p-6 rounded-2xl flex flex-col h-full group transition-all duration-300 ${
        isActive ? 'border-accent/40 shadow-[0_0_20px_rgba(57,255,20,0.1)]' : 'hover:border-accent/40'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-1 block group-hover:text-accent transition-colors">
            {project.category}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-white">{project.name}</h3>
            {isActive && (
              <div className="text-accent flex items-center gap-1 text-[9px] font-mono bg-accent/20 px-1.5 py-0.5 rounded border border-accent/40 animate-pulse">
                <Activity size={10} /> ACTIVE
              </div>
            )}
          </div>
        </div>
        <div 
          className="px-2 py-1 rounded text-[10px] font-mono font-bold uppercase"
          style={{ backgroundColor: `${project.color}11`, color: project.color, border: `1px solid ${project.color}33` }}
        >
          {project.status}
        </div>
      </div>

      <p className="text-zinc-500 text-sm mb-6 flex-grow leading-relaxed group-hover:text-zinc-400 transition-colors">
        {project.description}
      </p>

      <div className="space-y-3 mb-8">
        <h4 className="text-[11px] font-mono uppercase text-zinc-600 flex items-center gap-2">
          <Zap size={12} className="text-accent" /> Why Build?
        </h4>
        <ul className="space-y-2">
          {project.whyBuild.map((point, i) => (
            <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
              <ChevronRight size={14} className="mt-0.5 text-accent/40 shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-white/5">
        <a 
          href={project.links.docs} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] font-mono flex items-center gap-1 text-zinc-500 hover:text-accent transition-colors tracking-widest"
        >
          DOCS <ExternalLink size={10} />
        </a>
        <a 
          href={project.links.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] font-mono flex items-center gap-1 text-zinc-500 hover:text-accent transition-colors tracking-widest"
        >
          TWITTER <Twitter size={10} />
        </a>
        {project.links.github && (
          <a 
            href={project.links.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-mono flex items-center gap-1 text-zinc-500 hover:text-accent transition-colors tracking-widest"
          >
            GITHUB <Github size={10} />
          </a>
        )}
      </div>
    </motion.div>
  );
};
