export type Theme = 'dark' | 'light';

export interface GitHubProfile {
  username: string;
  avatarUrl?: string;
  repos: any[];
  languages: { [key: string]: number };
  scannedAt: string;
}

export interface RegisteredProject {
  id: string;
  title: string;
  liveUrl: string;
  repoLink: string;
  protocolId: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  whyBuild: string[];
  status: 'Alpha' | 'Beta' | 'Mainnet' | 'Testnet';
  difficulty: 1 | 2 | 3 | 4 | 5;
  links: {
    docs: string;
    twitter: string;
    github?: string;
  };
  color: string;
}

export interface Skill {
  name: string;
  level: number;
  relevance: string[];
}

export interface AirdropInteraction {
  id: string;
  protocol: string;
  status: 'Farming' | 'Snapshot' | 'Claimable';
  lastInteraction: string;
  notes?: string;
}

export interface ContentHook {
  id: string;
  hook: string;
  platform: 'TikTok' | 'YouTube' | 'X';
  status: 'Idea' | 'Drafting' | 'Filmed' | 'Posted';
  metrics?: {
    views: number;
    engagement: number;
  };
}

export interface ManualAlpha {
  id: string;
  url: string;
  title: string;
  timestamp: string;
}
