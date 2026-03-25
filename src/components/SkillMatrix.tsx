import React from 'react';
import { motion } from 'motion/react';
import { Skill, ManualProfile } from '../types';
import { Sliders, Award } from 'lucide-react';

interface SkillMatrixProps {
  skills: Skill[];
  profile: ManualProfile;
}

export const SkillMatrix: React.FC<SkillMatrixProps> = ({ skills, profile }) => {
  return (
    <div className="glass p-8 rounded-2xl border-accent/5">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(57,255,20,0.8)]" />
          Skill Alignment Matrix
        </h2>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20">
          <Award size={10} /> MANUAL
        </div>
      </div>
      
      <div className="space-y-8">
        {skills.map((skill, index) => {
          const level = profile.skills[skill.name] || 0;

          return (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-sm font-bold block flex items-center gap-2">
                    {skill.name}
                  </span>
                  <div className="flex gap-1 mt-1">
                    {skill.relevance.map(proj => (
                      <span key={proj} className="text-[9px] font-mono px-1 bg-white/5 text-zinc-500 rounded uppercase">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-xs font-mono text-accent font-bold">
                  {level}%
                </span>
              </div>
              
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${level}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                  className="h-full bg-accent shadow-[0_0_15px_rgba(57,255,20,0.6)]"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 pt-8 border-t border-white/5">
        <div className="flex items-center gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/5">
          <Sliders size={20} className="text-zinc-600" />
          <p className="text-[10px] text-zinc-500 font-mono leading-relaxed uppercase tracking-wider">
            Skill levels are manually adjusted to reflect current builder positioning and proof-of-work across the ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
};
