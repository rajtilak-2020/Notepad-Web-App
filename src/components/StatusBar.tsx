import React from 'react';

interface StatusBarProps {
  wordCount: number;
  isSaved: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ wordCount, isSaved }) => {
  return (
    <div className="bg-black border-t border-zinc-800 p-2 flex justify-between text-sm text-zinc-500">
      <div>Words: {wordCount}</div>
      <div>{isSaved ? 'Saved' : 'Unsaved changes...'}</div>
    </div>
  );
};