import React from 'react';
import { X } from 'lucide-react';
import { FindReplaceState } from '../types';

interface FindReplaceProps {
  findReplaceState: FindReplaceState;
  setFindReplaceState: (state: FindReplaceState) => void;
  onFind: () => void;
  onReplace: () => void;
  onReplaceAll: () => void;
}

export const FindReplace: React.FC<FindReplaceProps> = ({
  findReplaceState,
  setFindReplaceState,
  onFind,
  onReplace,
  onReplaceAll,
}) => {
  if (!findReplaceState.isVisible) return null;

  return (
    <div className="absolute top-16 right-4 bg-black p-4 rounded-lg shadow-lg border border-zinc-800 w-80 transition-all">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-zinc-300">Find & Replace</h3>
        <button
          onClick={() => setFindReplaceState({ ...findReplaceState, isVisible: false })}
          className="p-1 hover:bg-zinc-900 rounded transition-colors text-zinc-400 hover:text-zinc-200"
        >
          <X size={18} />
        </button>
      </div>
      <div className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Find"
            value={findReplaceState.findText}
            onChange={(e) => setFindReplaceState({ ...findReplaceState, findText: e.target.value })}
            className="w-full p-2 border rounded bg-black text-zinc-300 border-zinc-800 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 placeholder-zinc-600"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Replace with"
            value={findReplaceState.replaceText}
            onChange={(e) => setFindReplaceState({ ...findReplaceState, replaceText: e.target.value })}
            className="w-full p-2 border rounded bg-black text-zinc-300 border-zinc-800 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 placeholder-zinc-600"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onFind}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Find
          </button>
          <button
            onClick={onReplace}
            className="flex-1 bg-zinc-800 text-zinc-300 px-4 py-2 rounded hover:bg-zinc-700 transition-colors"
          >
            Replace
          </button>
          <button
            onClick={onReplaceAll}
            className="flex-1 bg-zinc-800 text-zinc-300 px-4 py-2 rounded hover:bg-zinc-700 transition-colors"
          >
            Replace All
          </button>
        </div>
      </div>
    </div>
  );
};