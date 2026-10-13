import React from 'react';
import { useConversationHistory } from '../hooks/useConversationHistory.tsx';

const ConversationHistoryPage: React.FC = () => {
  const { conversations, deleteConversation } = useConversationHistory();

  return (
    <div className="p-5 space-y-4">
      <h2 className="font-montserrat text-3xl font-bold text-center" style={{ color: 'var(--heading-color)' }}>Conversation History</h2>

      {conversations.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-4xl mb-3">💬</p>
          <p style={{ color: 'var(--text-color-dim)' }}>No saved conversations yet. Use the AI page and save an analysis!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((conv) => (
            <div key={conv.id} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--card-bg)' }}>
              <div className="mb-2">
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--heading-color)' }}>You asked:</p>
                <p className="text-sm" style={{ color: 'var(--text-color-dim)' }}>{conv.prompt}</p>
              </div>
              <div className="mb-2">
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--heading-color)' }}>AI response:</p>
                <p className="text-sm whitespace-pre-wrap">{conv.response}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs" style={{ color: 'var(--text-color-dim)' }}>
                  {new Date(conv.timestamp).toLocaleDateString()} at {new Date(conv.timestamp).toLocaleTimeString()}
                </p>
                <button
                  onClick={() => deleteConversation(conv.id)}
                  className="text-red-400 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationHistoryPage;
