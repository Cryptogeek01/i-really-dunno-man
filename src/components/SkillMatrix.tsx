import React from 'react';
import { motion } from 'motion/react';
import { Skill, GitHubProfile } from '../types';
import { Github, Award } from 'lucide-react';

interface SkillMatrixProps {
  skills: Skill[];
  profile: GitHubProfile | null;
}

export const SkillMatrix: React.FC<SkillMatrixProps> = ({ skills, profile }) => {
  const getAdjustedLevel = (skill: Skill) => {
    if (!profile) return skill.level;

    if (skill.name === 'Rust') {
      const rustRepos = profile.repos.filter(r => r.language === 'Rust').length;
      if (rustRepos >= 3) return 85;
      if (rustRepos > 0) return Math.max(skill.level, 70);
    }

    if (skill.name === 'Solidity') {
      const hasSolidity = profile.languages['Solidity'] || 
                         profile.repos.some(r => r.description?.toLowerCase().includes('hardhat') || 
                                               r.description?.toLowerCase().includes('foundry'));
      if (hasSolidity) return 90;
    }

    return skill.level;
  };

  return (
    <div className="glass p-8 rounded-2xl border-accent/5">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(57,255,20,0.8)]" />
          Skill Alignment Matrix
        </h2>
        {profile && (
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20">
            <Award size={10} /> SCANNED
          </div>
        )}
      </div>
      
      <div className="space-y-8">
        {skills.map((skill, index) => {
          const adjustedLevel = getAdjustedLevel(skill);
          const isBoosted = profile && adjustedLevel > skill.level;

          return (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-sm font-bold block flex items-center gap-2">
                    {skill.name}
                    {isBoosted && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-[8px] bg-accent text-black px-1 rounded font-bold"
                      >
                        POW BOOST
                      </motion.span>
                    )}
                  </span>
                  <div className="flex gap-1 mt-1">
                    {skill.relevance.map(proj => (
                      <span key={proj} className="text-[9px] font-mono px-1 bg-white/5 text-zinc-500 rounded uppercase">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={`text-xs font-mono ${isBoosted ? 'text-accent font-bold' : 'text-zinc-500'}`}>
                  {adjustedLevel}%
                </span>
              </div>
              
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${adjustedLevel}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                  className={`h-full ${isBoosted ? 'bg-accent shadow-[0_0_15px_rgba(57,255,20,0.6)]' : 'bg-accent'}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 pt-8 border-t border-white/5">
        <div className="flex items-center gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/5">
          <Github size={20} className="text-zinc-600" />
          <p className="text-[10px] text-zinc-500 font-mono leading-relaxed uppercase tracking-wider">
            {profile 
              ? `Verified for @${profile.username}. ${Object.keys(profile.languages).length} languages detected.`
              : "Sync profile to verify builder status and unlock PoW boosts."}
          </p>
        </div>
      </div>
    </div>
  );
};
