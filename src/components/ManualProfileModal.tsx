import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Sliders } from 'lucide-react';
import { ManualProfile } from '../types';
import { SKILLS } from '../constants';

interface ManualProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ManualProfile;
  onUpdate: (profile: ManualProfile) => void;
}

export const ManualProfileModal: React.FC<ManualProfileModalProps> = ({ isOpen, onClose, profile, onUpdate }) => {
  const [tempSkills, setTempSkills] = useState<{ [key: string]: number }>(profile.skills);

  const handleSave = () => {
    onUpdate({ skills: tempSkills });
    onClose();
  };

  const updateSkill = (name: string, value: number) => {
    setTempSkills(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            className="relative w-full max-w-lg glass rounded-2xl overflow-hidden shadow-2xl border-accent/20"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <Sliders size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-ink">Manual Profile Edit</h2>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Adjust Skill Matrix</p>
                </div>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {SKILLS.map((skill) => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                      {skill.name}
                    </label>
                    <span className="text-xs font-mono text-accent">{tempSkills[skill.name] || 0}%</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={tempSkills[skill.name] || 0}
                    onChange={(e) => updateSkill(skill.name, parseInt(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              ))}
            </div>

            <div className="p-6 bg-white/[0.02] border-t border-white/5 flex gap-3">
              <button
                onClick={onClose}
                className="flex-grow py-3 rounded-xl border border-white/5 text-xs font-mono uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-grow py-3 rounded-xl bg-accent text-black text-xs font-mono font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(57,255,20,0.2)]"
              >
                <Save size={16} />
                Save Profile
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
