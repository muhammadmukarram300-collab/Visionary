import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Conversation } from '../types.ts';
import { LOCAL_STORAGE_CONVERSATIONS_KEY } from '../constants.ts';

interface ConversationHistoryContextType {
  conversations: Conversation[];
  saveConversation: (prompt: string, response: string) => void;
  deleteConversation: (id: string) => void;
}

const ConversationHistoryContext = createContext<ConversationHistoryContextType | undefined>(undefined);

export const ConversationHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_CONVERSATIONS_KEY);
      if (stored) setConversations(JSON.parse(stored));
    } catch (e) {
      // ignore
    }
  }, []);

  const saveConversation = useCallback((prompt: string, response: string) => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      prompt,
      response,
      timestamp: new Date().toISOString(),
    };
    setConversations((prev) => {
      const updated = [newConv, ...prev];
      localStorage.setItem(LOCAL_STORAGE_CONVERSATIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem(LOCAL_STORAGE_CONVERSATIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <ConversationHistoryContext.Provider value={{ conversations, saveConversation, deleteConversation }}>
      {children}
    </ConversationHistoryContext.Provider>
  );
};

export const useConversationHistory = () => {
  const ctx = useContext(ConversationHistoryContext);
  if (!ctx) throw new Error('useConversationHistory must be used within ConversationHistoryProvider');
  return ctx;
};
