import React, { useState, useMemo } from 'react';
import { useVisions } from '../hooks/useVisions.tsx';
import { analyzeTextWithAIStream } from '../services/geminiService.ts';
import LoadingSpinner from './LoadingSpinner.tsx';
import { useConversationHistory } from '../hooks/useConversationHistory.tsx';
import VoiceVisualizer from './VoiceVisualizer.tsx';
import { useTheme } from '../hooks/useTheme.tsx';

const AiSuggestionsPage: React.FC = () => {
  const { visions } = useVisions();
  const { saveConversation } = useConversationHistory();
  const { theme } = useTheme();

  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [suggestionsResult, setSuggestionsResult] = useState('');
  
  const [isGeneralLoading, setIsGeneralLoading] = useState(false);
  const [generalInput, setGeneralInput] = useState('');
  const [generalResult, setGeneralResult] = useState('');

  const [isVisualizing, setIsVisualizing] = useState(false);

  const today = new Date().toDateString();

  const stats = useMemo(() => {
    const totalVisions = visions.length;
    const completedToday = visions.filter(v => v.completedDates.includes(today)).length;
    const dailyCompletionRate = totalVisions > 0 ? Math.round((completedToday / totalVisions) * 100) : 0;
    return { totalVisions, completedToday, dailyCompletionRate };
  }, [visions, today]);

  const streamAiResponse = async (prompt: string, systemInstruction: string, setResult: (value: React.SetStateAction<string>) => void, setLoading: (value: React.SetStateAction<boolean>) => void) => {
    setLoading(true);
    setResult('');
    let fullText = '';
    try {
        for await (const chunk of analyzeTextWithAIStream(prompt, systemInstruction)) {
            fullText += chunk;
            setResult(fullText);
        }
    } catch (e) {
        setResult("An error occurred during analysis.");
    } finally {
        setLoading(false);
    }
  };

  const getSuggestions = () => {
    const allVisionInfo = visions.map(v => `${v.name}: ${v.description}`).join('\n');
    let context = `User's visions descriptions:\n"${allVisionInfo || 'No descriptions provided.'}"\n`;
    context += `Today's completion rate: ${stats.dailyCompletionRate}% (${stats.completedToday} out of ${stats.totalVisions} visions completed).\n`;
    
    const prompt = `Based on the following context about a user's visions and their daily progress, provide personalized, actionable, and encouraging AI suggestions for new habits or ways to improve their current vision tracking and overall well-being. Respond in well-formatted markdown.`;
    streamAiResponse(context, prompt, setSuggestionsResult, setIsSuggestionsLoading);
  };

  const getGeneralAnalysis = () => {
    if (!generalInput.trim()) {
      setGeneralResult('Please enter some text to analyze.');
      return;
    }
    const prompt = `Analyze the following text and provide a concise summary or key insights. If the text appears to be a personal reflection or related to mindset, offer general, encouraging feedback or relevant observations. Respond in well-formatted markdown.`;
    streamAiResponse(generalInput, prompt, setGeneralResult, setIsGeneralLoading);
  };

  const handleSaveGeneral = () => {
    if (generalInput && generalResult) {
        saveConversation(generalInput, generalResult);
        alert('Conversation saved!');
    }
  };

  return (
    <div className="p-5 space-y-8">
      <h2 className="font-montserrat text-3xl font-bold text-center" style={{color: 'var(--heading-color)'}}>AI Assistance</h2>

      <div className="p-4 rounded-xl shadow-lg" style={{backgroundColor: 'var(--card-bg)'}}>
        <h3 className="font-montserrat text-xl font-semibold mb-3 text-center" style={{color: 'var(--heading-color)'}}>Personalized Suggestions</h3>
        <div className="min-h-[80px] mb-4 p-2 rounded-lg" style={{backgroundColor: 'var(--input-bg)'}}>
            {isSuggestionsLoading && !suggestionsResult ? <LoadingSpinner /> : (
            <div className={`whitespace-pre-wrap prose prose-sm max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
                {suggestionsResult || 'Suggestions based on your visions and progress will appear here.'}
            </div>
            )}
        </div>
        <button onClick={getSuggestions} disabled={isSuggestionsLoading} className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:bg-gray-500">
          {isSuggestionsLoading ? 'Generating...' : 'Get New Suggestions'}
        </button>
      </div>

      <div className="p-4 rounded-xl shadow-lg" style={{backgroundColor: 'var(--card-bg)'}}>
        <h3 className="font-montserrat text-xl font-semibold mb-3 text-center" style={{color: 'var(--heading-color)'}}>General Text Analysis</h3>
        <p className="text-md mb-2 text-center" style={{color: 'var(--text-color-dim)'}}>Analyze any text.</p>
        <textarea
          value={generalInput}
          onChange={e => setGeneralInput(e.target.value)}
          className="w-full h-24 p-2 text-sm rounded-lg focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/50 mb-2"
          style={{backgroundColor: 'var(--input-bg)', color: 'var(--text-color)', borderColor: 'var(--text-color-dim)'}}
          placeholder="e.g., a dream you had, a tough decision you're facing, or a goal you want to break down..."
        />
        <div className="flex items-center gap-2 mb-4">
            <button onClick={getGeneralAnalysis} disabled={isGeneralLoading} className="flex-grow bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:bg-gray-500">
              {isGeneralLoading ? 'Analyzing...' : 'Analyze Text'}
            </button>
            <button onClick={() => setIsVisualizing(!isVisualizing)} className={`p-3 rounded-xl transition-colors ${isVisualizing ? 'bg-red-500' : 'bg-gray-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
            </button>
        </div>

        {isVisualizing && <VoiceVisualizer active={isVisualizing} />}
        
        <div className="mt-4 p-2 rounded-lg shadow-inner min-h-[80px]" style={{backgroundColor: 'var(--input-bg)'}}>
          {isGeneralLoading && !generalResult ? <LoadingSpinner /> : (
            <div className={`whitespace-pre-wrap prose prose-sm max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
              {generalResult || 'Your general AI analysis will appear here.'}
            </div>
          )}
        </div>
         {!isGeneralLoading && generalResult && (
            <div className="flex justify-end mt-2">
                <button onClick={handleSaveGeneral} className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-3 rounded-lg">
                    Save
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default AiSuggestionsPage;