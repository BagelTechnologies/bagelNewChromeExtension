import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MentionSuggestion } from '.';

interface MentionContextType {
  suggestions: MentionSuggestion[];
  setSuggestions: (suggestions: MentionSuggestion[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const MentionContext = createContext<MentionContextType | undefined>(undefined);

export const MentionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [suggestions, setSuggestions] = useState<MentionSuggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const value = { suggestions, setSuggestions, loading, setLoading };

  return <MentionContext.Provider value={value}>{children}</MentionContext.Provider>;
};

export const useMentions = (): MentionContextType => {
  const context = useContext(MentionContext);
  if (!context) {
    throw new Error('useMentions must be used within a MentionProvider');
  }
  return context;
};
