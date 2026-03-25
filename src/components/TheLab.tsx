import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Table, Video, Plus, CheckCircle2, Circle, Trash2, TrendingUp, BarChart3 } from 'lucide-react';
import { AirdropInteraction, ContentHook } from '../types';

export const TheLab: React.FC = () => {
  const [airdrops, setAirdrops] = useState<AirdropInteraction[]>(() => {
    const saved = localStorage.getItem('lab_airdrops');
    return saved ? JSON.parse(saved) : [
      { id: '1', protocol: 'Nexus', status: 'Farming', lastInteraction: '2024-03-24' },
      { id: '2', protocol: 'Arcium', status: 'Farming', lastInteraction: '2024-03-20' },
    ];
  });

  const [hooks, setHooks] = useState<ContentHook[]>(() => {
    const saved = localStorage.getItem('lab_hooks');
    return saved ? JSON.parse(saved) : [
      { id: '1', hook: 'Why RISC-V is the future of L1s (Rialo)', platform: 'TikTok', status: 'Idea', metrics: { views: 1200, engagement: 45 } },
      { id: '2', hook: 'Building AI Agents on GenLayer', platform: 'YouTube', status: 'Drafting', metrics: { views: 850, engagement: 32 } },
    ];
  });

  const [whopProgress, setWhopProgress] = useState(() => {
    const saved = localStorage.getItem('whop_progress');
    return saved ? parseInt(saved) : 65;
  });

  const saveAirdrops = (data: AirdropInteraction[]) => {
    setAirdrops(data);
    localStorage.setItem('lab_airdrops', JSON.stringify(data));
  };

  const saveHooks = (data: ContentHook[]) => {
    setHooks(data);
    localStorage.setItem('lab_hooks', JSON.stringify(data));
  };

  const addAirdrop = () => {
    const name = prompt('Protocol Name?');
    if (!name) return;
    const newItem: AirdropInteraction = {
      id: Date.now().toString(),
      protocol: name,
      status: 'Farming',
      lastInteraction: new Date().toISOString().split('T')[0]
    };
    saveAirdrops([newItem, ...airdrops]);
  };

  const addHook = () => {
    const text = prompt('Hook Idea?');
    if (!text) return;
    const newItem: ContentHook = {
      id: Date.now().toString(),
      hook: text,
      platform: 'TikTok',
      status: 'Idea',
      metrics: { views: 0, engagement: 0 }
    };
    saveHooks([newItem, ...hooks]);
  };

  const deleteAirdrop = (id: string) => saveAirdrops(airdrops.filter(a => a.id !== id));
  const deleteHook = (id: string) => saveHooks(hooks.filter(h => h.id !== id));

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <FlaskConical className="text-accent" size={24} />
          The Lab: Personal Pipeline
        </h2>
      </div>

      {/* Whop Brand Progress */}
      <div className="glass p-8 rounded-2xl border-accent/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-mono uppercase text-zinc-400 flex items-center gap-2">
            <TrendingUp size={14} className="text-accent" /> Whop Brand Growth
          </h3>
          <span className="text-xl font-bold text-accent">{whopProgress}%</span>
        </div>
        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${whopProgress}%` }}
            className="h-full bg-accent rounded-full shadow-[0_0_15px_rgba(57,255,20,0.4)]"
          />
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          <span>Phase 1: Awareness</span>
          <span>Phase 2: Conversion</span>
          <span>Phase 3: Scale</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Airdrop Tracker */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase text-zinc-400 flex items-center gap-2">
              <Table size={14} className="text-accent" /> Airdrop Pipeline
            </h3>
            <button onClick={addAirdrop} className="text-xs font-mono text-accent hover:text-white flex items-center gap-1 transition-colors">
              <Plus size={12} /> ADD PROTOCOL
            </button>
          </div>

          <div className="glass rounded-2xl overflow-hidden border-white/5">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.02] border-b border-white/5">
                <tr>
                  <th className="p-4 font-mono text-[10px] text-zinc-500 uppercase">Protocol</th>
                  <th className="p-4 font-mono text-[10px] text-zinc-500 uppercase">Status</th>
                  <th className="p-4 font-mono text-[10px] text-zinc-500 uppercase">Last Interaction</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {airdrops.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="p-4 font-bold text-white">{item.protocol}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        item.status === 'Claimable' ? 'bg-accent text-black font-bold' : 'bg-white/5 text-zinc-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-500 font-mono text-xs">{item.lastInteraction}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => deleteAirdrop(item.id)} className="text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Content Ops */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase text-zinc-400 flex items-center gap-2">
              <Video size={14} className="text-accent" /> Content Ops
            </h3>
            <button onClick={addHook} className="text-xs font-mono text-accent hover:text-white flex items-center gap-1 transition-colors">
              <Plus size={12} /> NEW HOOK
            </button>
          </div>

          <div className="space-y-4">
            {hooks.map((hook) => (
              <div key={hook.id} className="glass p-5 rounded-xl space-y-4 group border-white/5 hover:border-accent/20 transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{hook.platform}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-500">
                      <BarChart3 size={10} /> {hook.metrics?.views.toLocaleString()}
                    </div>
                    <button onClick={() => deleteHook(hook.id)} className="text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-bold leading-relaxed text-white">{hook.hook}</p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {['Idea', 'Drafting', 'Filmed', 'Posted'].map((s) => (
                    <button 
                      key={s}
                      onClick={() => {
                        const updated = hooks.map(h => h.id === hook.id ? { ...h, status: s as any } : h);
                        saveHooks(updated);
                      }}
                      className={`flex items-center gap-1 text-[9px] font-mono uppercase transition-colors ${
                        hook.status === s ? 'text-accent font-bold' : 'text-zinc-600 hover:text-zinc-400'
                      }`}
                    >
                      {hook.status === s ? <CheckCircle2 size={10} /> : <Circle size={10} />}
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
