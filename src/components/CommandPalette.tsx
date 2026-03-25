import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Command, Zap, FlaskConical, Radio, Plus, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (action: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelect }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelect('open');
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onSelect]);

  const actions = [
    { id: 'builder', name: 'Switch to Builder View', icon: <Zap size={16} />, shortcut: 'B' },
    { id: 'lab', name: 'Open The Lab', icon: <FlaskConical size={16} />, shortcut: 'L' },
    { id: 'live', name: 'Check Live Ops', icon: <Radio size={16} />, shortcut: 'O' },
    { id: 'alpha', name: 'Add Manual Alpha', icon: <Plus size={16} />, shortcut: 'A' },
  ];

  const filteredActions = actions.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl glass rounded-2xl overflow-hidden shadow-2xl border-accent/20"
          >
            <div className="flex items-center p-4 border-b border-white/5">
              <Search size={20} className="text-zinc-500 mr-3" />
              <input
                autoFocus
                placeholder="Search commands or protocols..."
                className="bg-transparent border-none outline-none text-lg w-full text-white placeholder:text-zinc-600"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-zinc-500">
                <Command size={10} /> K
              </div>
            </div>

            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {filteredActions.length > 0 ? (
                filteredActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      onSelect(action.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-accent/10 hover:text-accent transition-colors text-zinc-400 text-sm group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500 group-hover:text-accent">{action.icon}</span>
                      {action.name}
                    </div>
                    <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-zinc-600 group-hover:text-accent/50">
                      {action.shortcut}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-zinc-600 text-sm">
                  No results found for "{query}"
                </div>
              )}
            </div>

            <div className="p-3 bg-white/[0.02] border-t border-white/5 flex justify-between items-center px-4">
              <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
