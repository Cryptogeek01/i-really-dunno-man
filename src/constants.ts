import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'genlayer',
    name: 'GenLayer',
    category: 'AI Smart Contracts',
    description: 'The first blockchain that can run LLMs as part of its consensus mechanism, enabling intelligent smart contracts.',
    whyBuild: [
      'Build AI-driven DAOs',
      'On-chain natural language processing',
      'Autonomous agents with financial sovereignty'
    ],
    status: 'Alpha',
    difficulty: 4,
    links: {
      docs: 'https://docs.genlayer.com',
      twitter: 'https://twitter.com/genlayer',
      github: 'https://github.com/genlayer'
    },
    color: '#00ff88'
  },
  {
    id: 'arcium',
    name: 'Arcium',
    category: 'Confidential Computing',
    description: 'A decentralized network for confidential computing, allowing developers to build privacy-preserving applications.',
    whyBuild: [
      'Privacy-first DeFi',
      'Secure data marketplaces',
      'Confidential AI training'
    ],
    status: 'Testnet',
    difficulty: 5,
    links: {
      docs: 'https://docs.arcium.com',
      twitter: 'https://twitter.com/arcium_network'
    },
    color: '#ff00ff'
  },
  {
    id: 'rialo',
    name: 'Rialo',
    category: 'RISC-V L1',
    description: 'High-performance RISC-V Layer 1 by Subzero Labs, designed for maximum execution efficiency.',
    whyBuild: [
      'Native RISC-V execution',
      'High-throughput parallel processing',
      'Next-gen infrastructure primitives'
    ],
    status: 'Alpha',
    difficulty: 4,
    links: {
      docs: 'https://docs.rialo.io',
      twitter: 'https://twitter.com/rialo_l1'
    },
    color: '#00ffff'
  },
  {
    id: 'opengradient',
    name: 'OpenGradient',
    category: 'Decentralized AI',
    description: 'Decentralized infrastructure for high-performance AI compute and model serving on-chain.',
    whyBuild: [
      'Verifiable AI inference',
      'Decentralized model training',
      'AI-powered gaming logic'
    ],
    status: 'Alpha',
    difficulty: 4,
    links: {
      docs: 'https://docs.opengradient.com',
      twitter: 'https://twitter.com/opengradient'
    },
    color: '#ff8800'
  },
  {
    id: 'nexus',
    name: 'Nexus',
    category: 'Zero-Knowledge',
    description: 'The first ZKVM designed for the modular era, enabling verifiable computation at scale.',
    whyBuild: [
      'Universal ZK proofs',
      'Modular execution scaling',
      'Trustless compute offloading'
    ],
    status: 'Beta',
    difficulty: 5,
    links: {
      docs: 'https://docs.nexus.xyz',
      twitter: 'https://twitter.com/nexus_xyz'
    },
    color: '#ffffff'
  },
  {
    id: 'base',
    name: 'Base',
    category: 'Ethereum L2',
    description: "Coinbase's L2 built on the OP Stack, designed to bring the next billion users to web3.",
    whyBuild: [
      'Massive user distribution via Coinbase',
      'Low fees, high throughput',
      'Rich ecosystem of consumer apps'
    ],
    status: 'Mainnet',
    difficulty: 2,
    links: {
      docs: 'https://docs.base.org',
      twitter: 'https://twitter.com/base',
      github: 'https://github.com/base-org'
    },
    color: '#0052ff'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Solidity', level: 85, relevance: ['base', 'rialo'] },
  { name: 'Rust', level: 60, relevance: ['arcium', 'genlayer', 'nexus'] },
  { name: 'AI/ML', level: 45, relevance: ['genlayer', 'opengradient'] },
  { name: 'Cryptography', level: 30, relevance: ['arcium', 'opengradient', 'nexus'] },
  { name: 'Distributed Systems', level: 50, relevance: ['rialo', 'arcium'] }
];
