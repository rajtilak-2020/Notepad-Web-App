import React from 'react';
import { 
  FileText, Save, Printer, Copy, Scissors, Clipboard, 
  RotateCcw, RotateCw, Search, Download
} from 'lucide-react';
import { EditorState } from '../types';

interface ToolbarProps {
  editorState: EditorState;
  onSave: () => void;
  onPrint: () => void;
  onDownload: () => void;
  onFindReplace: () => void;
  setEditorState: (state: EditorState) => void;
}

const fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'];
const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px'];

export const Toolbar: React.FC<ToolbarProps> = ({
  editorState,
  onSave,
  onPrint,
  onDownload,
  onFindReplace,
  setEditorState,
}) => {
  return (
    <div className="bg-black border-b border-zinc-800 p-2 flex items-center space-x-2 transition-all">
      <button
        onClick={onSave}
        className="p-2 hover:bg-zinc-900 rounded transition-colors text-zinc-400 hover:text-zinc-200"
        title="Save (Ctrl+S)"
      >
        <Save size={18} />
      </button>
      <button
        onClick={onPrint}
        className="p-2 hover:bg-zinc-900 rounded transition-colors text-zinc-400 hover:text-zinc-200"
        title="Print (Ctrl+P)"
      >
        <Printer size={18} />
      </button>
      <button
        onClick={onDownload}
        className="p-2 hover:bg-zinc-900 rounded transition-colors text-zinc-400 hover:text-zinc-200"
        title="Download as PDF"
      >
        <Download size={18} />
      </button>
      <div className="h-6 w-px bg-zinc-800 mx-2" />
      <button
        onClick={() => document.execCommand('copy')}
        className="p-2 hover:bg-zinc-900 rounded transition-colors text-zinc-400 hover:text-zinc-200"
        title="Copy (Ctrl+C)"
      >
        <Copy size={18} />
      </button>
      <button
        onClick={() => document.execCommand('cut')}
        className="p-2 hover:bg-zinc-900 rounded transition-colors text-zinc-400 hover:text-zinc-200"
        title="Cut (Ctrl+X)"
      >
        <Scissors size={18} />
      </button>
      <button
        onClick={() => document.execCommand('paste')}
        className="p-2 hover:bg-zinc-900 rounded transition-colors text-zinc-400 hover:text-zinc-200"
        title="Paste (Ctrl+V)"
      >
        <Clipboard size={18} />
      </button>
      <div className="h-6 w-px bg-zinc-800 mx-2" />
      <button
        onClick={() => document.execCommand('undo')}
        className="p-2 hover:bg-zinc-900 rounded transition-colors text-zinc-400 hover:text-zinc-200"
        title="Undo (Ctrl+Z)"
      >
        <RotateCcw size={18} />
      </button>
      <button
        onClick={() => document.execCommand('redo')}
        className="p-2 hover:bg-zinc-900 rounded transition-colors text-zinc-400 hover:text-zinc-200"
        title="Redo (Ctrl+Y)"
      >
        <RotateCw size={18} />
      </button>
      <div className="h-6 w-px bg-zinc-800 mx-2" />
      <button
        onClick={onFindReplace}
        className="p-2 hover:bg-zinc-900 rounded transition-colors text-zinc-400 hover:text-zinc-200"
        title="Find and Replace (Ctrl+F)"
      >
        <Search size={18} />
      </button>
      <div className="h-6 w-px bg-zinc-800 mx-2" />
      <select
        value={editorState.fontFamily}
        onChange={(e) => setEditorState({ ...editorState, fontFamily: e.target.value })}
        className="p-2 border rounded bg-black text-zinc-300 border-zinc-800 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
      >
        {fontFamilies.map(font => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>
      <select
        value={editorState.fontSize}
        onChange={(e) => setEditorState({ ...editorState, fontSize: e.target.value })}
        className="p-2 border rounded bg-black text-zinc-300 border-zinc-800 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
      >
        {fontSizes.map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
    </div>
  );
};