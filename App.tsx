import React, { useState, useEffect, useCallback } from 'react';
import { Page } from './types.ts';
import OpeningPage from './components/OpeningPage.tsx';
import IntermediateSlide from './components/IntermediateSlide.tsx';
import HomePage from './components/HomePage.tsx';
import AnalysisPage from './components/AnalysisPage.tsx';
import MindsetPage from './components/MindsetPage.tsx';
import AiSuggestionsPage from './components/AiSuggestionsPage.tsx';
import HistoryPage from './components/HistoryPage.tsx';
import SettingsPage from './components/SettingsPage.tsx';
import NavBar from './components/NavBar.tsx';
import { VisionProvider } from './hooks/useVisions.tsx';
import { ThemeProvider } from './hooks/useTheme.tsx';
import { ConversationHistoryProvider } from './hooks/useConversationHistory.tsx';
import ConversationHistoryPage from './components/ConversationHistoryPage.tsx';
import PerformanceCoachPage from './components/PerformanceCoachPage.tsx';

const pageToBgClass: Record<Page, string> = {
  opening: 'bg-welcome',
  intermediate: 'intermediate-slide-anim',
  home: 'bg-home',
  analysis: 'bg-analysis',
  performanceCoach: 'bg-performanceCoach',
  mindset: 'bg-mindset',
  ai: 'bg-ai',
  history: 'bg-history',
  settings: 'bg-settings',
  conversationHistory: 'bg-conversationHistory',
};

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('opening');

  useEffect(() => {
    document.body.className = pageToBgClass[page] || 'bg-welcome';
  }, [page]);

  const handleNavigate = useCallback((newPage: Page) => {
    setPage(newPage);
  }, []);

  const handleStart = useCallback(() => {
    setPage('intermediate');
    setTimeout(() => {
      setPage('home');
    }, 1500);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage />;
      case 'analysis': return <AnalysisPage />;
      case 'performanceCoach': return <PerformanceCoachPage />;
      case 'mindset': return <MindsetPage />;
      case 'ai': return <AiSuggestionsPage />;
      case 'history': return <HistoryPage />;
      case 'settings': return <SettingsPage />;
      case 'conversationHistory': return <ConversationHistoryPage />;
      default: return <HomePage />;
    }
  };

  return (
    <ThemeProvider>
      <VisionProvider>
        <ConversationHistoryProvider>
          {page === 'opening' ? (
            <OpeningPage onStart={handleStart} />
          ) : page === 'intermediate' ? (
            <IntermediateSlide />
          ) : (
            <div className="flex items-center justify-center min-h-screen">
              <div 
                style={{
                  backgroundColor: 'var(--container-bg)',
                  borderColor: 'rgba(255, 255, 255, 0.1)'
                }}
                className="backdrop-blur-xl rounded-2xl shadow-2xl w-[95%] max-w-[450px] h-[90vh] flex flex-col relative overflow-hidden border"
              >
                <main className="flex-grow overflow-y-auto" style={{color: 'var(--text-color)'}}>
                  {renderPage()}
                </main>
                <NavBar currentPage={page} onNavigate={handleNavigate} />
              </div>
            </div>
          )}
        </ConversationHistoryProvider>
      </VisionProvider>
    </ThemeProvider>
  );
};

export default App;