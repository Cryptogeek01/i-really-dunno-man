import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Radio, ExternalLink, Trophy, TrendingUp, AlertCircle, Plus, Link as LinkIcon } from 'lucide-react';
import { ManualAlpha } from '../types';

export const LiveOps: React.FC = () => {
  const [airdrops, setAirdrops] = useState<any[]>([]);
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [manualAlphas, setManualAlphas] = useState<ManualAlpha[]>(() => {
    const saved = localStorage.getItem('manual_alpha');
    return saved ? JSON.parse(saved) : [];
  });
  const [newAlphaUrl, setNewAlphaUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated DeFiLlama Airdrop Fetch
        // In a real app, we'd fetch from https://api.llama.fi/protocols and filter
        // but for this demo, we'll simulate the "tokenless" list
        const mockAirdrops = [
          { name: 'Hyperlane', category: 'Interoperability', status: 'Tokenless', tvl: '$240M' },
          { name: 'Berachain', category: 'L1', status: 'Testnet', tvl: 'N/A' },
          { name: 'Monad', category: 'L1', status: 'Devnet', tvl: 'N/A' },
          { name: 'Ambient', category: 'DEX', status: 'Tokenless', tvl: '$80M' },
        ];
        
        // Simulated Hackathon Feed
        const mockHackathons = [
          { title: 'ETHGlobal London', prize: '$500k', deadline: 'Apr 12', platform: 'ETHGlobal' },
          { title: 'Base Buildathon', prize: '$250k', deadline: 'May 05', platform: 'DoraHacks' },
          { title: 'Arcium Privacy Hack', prize: '$100k', deadline: 'Apr 30', platform: 'Gitcoin' },
        ];

        setAirdrops(mockAirdrops);
        setHackathons(mockHackathons);
      } catch (e) {
        console.error('Failed to fetch live ops', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addAlpha = () => {
    if (!newAlphaUrl) return;
    const newAlpha: ManualAlpha = {
      id: Date.now().toString(),
      url: newAlphaUrl,
      title: new URL(newAlphaUrl).hostname,
      timestamp: new Date().toISOString(),
    };
    const updated = [newAlpha, ...manualAlphas];
    setManualAlphas(updated);
    localStorage.setItem('manual_alpha', JSON.stringify(updated));
    setNewAlphaUrl('');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Radio className="text-accent animate-pulse" size={24} />
          Live Opportunity Engine
        </h2>
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Sync Status: <span className="text-accent">Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tokenless Protocols */}
        <div className="glass p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase text-zinc-400 flex items-center gap-2">
              <TrendingUp size={14} className="text-accent" /> Tokenless Alpha
            </h3>
            <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded">DeFiLlama</span>
          </div>
          
          <div className="space-y-4">
            {airdrops.map((drop, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-colors">
                <div>
                  <div className="text-sm font-bold">{drop.name}</div>
                  <div className="text-[10px] text-zinc-500 uppercase">{drop.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-accent">{drop.status}</div>
                  <div className="text-[10px] text-zinc-600">{drop.tvl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Hackathons */}
        <div className="glass p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase text-zinc-400 flex items-center gap-2">
              <Trophy size={14} className="text-accent" /> Active Hackathons
            </h3>
            <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded">Dora/Gitcoin</span>
          </div>

          <div className="space-y-4">
            {hackathons.map((hack, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-bold">{hack.title}</div>
                  <div className="text-[10px] font-mono text-accent">{hack.prize}</div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-zinc-500">
                  <span>Due: {hack.deadline}</span>
                  <span className="uppercase">{hack.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manual Alpha Input */}
        <div className="glass p-6 rounded-2xl space-y-6">
          <h3 className="text-sm font-mono uppercase text-zinc-400 flex items-center gap-2">
            <AlertCircle size={14} className="text-accent" /> Manual Alpha
          </h3>
          
          <div className="flex gap-2">
            <input 
              placeholder="Paste alpha link..."
              className="flex-grow bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-accent/50 transition-colors"
              value={newAlphaUrl}
              onChange={(e) => setNewAlphaUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addAlpha()}
            />
            <button 
              onClick={addAlpha}
              className="bg-accent text-black p-2 rounded-lg hover:bg-white transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {manualAlphas.map((alpha) => (
              <a 
                key={alpha.id}
                href={alpha.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors group"
              >
                <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <LinkIcon size={14} />
                </div>
                <div className="min-w-0 flex-grow">
                  <div className="text-xs font-bold truncate group-hover:text-accent transition-colors">{alpha.title}</div>
                  <div className="text-[9px] text-zinc-600 font-mono">{new Date(alpha.timestamp).toLocaleDateString()}</div>
                </div>
                <ExternalLink size={12} className="text-zinc-700 group-hover:text-zinc-400" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
