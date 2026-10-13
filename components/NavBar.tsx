import React from 'react';
import { Page } from '../types.ts';

interface NavBarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { page: Page; icon: string; label: string }[] = [
  { page: 'home', icon: '🏠', label: 'Home' },
  { page: 'analysis', icon: '📊', label: 'Analysis' },
  { page: 'performanceCoach', icon: '💪', label: 'Coach' },
  { page: 'mindset', icon: '🧠', label: 'Mindset' },
  { page: 'ai', icon: '🤖', label: 'AI' },
  { page: 'history', icon: '📜', label: 'History' },
  { page: 'conversationHistory', icon: '💬', label: 'Chats' },
  { page: 'settings', icon: '⚙️', label: 'Settings' },
];

const NavBar: React.FC<NavBarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="flex items-center justify-around px-1 py-2 overflow-x-auto" style={{ backgroundColor: 'var(--card-bg)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      {navItems.map((item) => (
        <button
          key={item.page}
          onClick={() => onNavigate(item.page)}
          className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all min-w-[52px]"
          style={{
            opacity: currentPage === item.page ? 1 : 0.5,
            transform: currentPage === item.page ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default NavBar;
