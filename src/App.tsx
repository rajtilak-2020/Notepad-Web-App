import React, { useState, useRef, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import html2pdf from 'html2pdf.js';
import { Toolbar } from './components/Toolbar';
import { FindReplace } from './components/FindReplace';
import { StatusBar } from './components/StatusBar';
import { useAutosave } from './hooks/useAutosave';
import { EditorState, FindReplaceState } from './types';

function App() {
  const [editorState, setEditorState] = useState<EditorState>({
    content: '',
    wordCount: 0,
    isSaved: true,
    fontSize: '16px',
    fontFamily: 'Arial'
  });

  const [findReplaceState, setFindReplaceState] = useState<FindReplaceState>({
    findText: '',
    replaceText: '',
    isVisible: false
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const { saveToLocalStorage } = useAutosave(editorState, setEditorState);

  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerText;
      const words = content.trim() ? content.trim().split(/\s+/).length : 0;
      
      setEditorState({
        ...editorState,
        content,
        wordCount: words,
        isSaved: false
      });
    }
  };

  const handleSave = () => {
    saveToLocalStorage();
    toast.success('Document saved successfully!', {
      style: {
        background: '#27272a',
        color: '#e4e4e7'
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (editorRef.current) {
      const element = editorRef.current;
      const opt = {
        margin: 1,
        filename: 'note.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        toast.success('PDF downloaded successfully!', {
          style: {
            background: '#27272a',
            color: '#e4e4e7'
          }
        });
      });
    }
  };

  const handleFind = () => {
    if (!findReplaceState.findText) return;
    
    const content = editorRef.current?.innerText || '';
    const regex = new RegExp(findReplaceState.findText, 'gi');
    
    if (!regex.test(content)) {
      toast.error('No matches found', {
        style: {
          background: '#27272a',
          color: '#e4e4e7'
        }
      });
    }
  };

  const handleReplace = () => {
    if (!findReplaceState.findText) return;
    
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    
    if (range) {
      range.deleteContents();
      range.insertNode(document.createTextNode(findReplaceState.replaceText));
      handleContentChange();
    }
  };

  const handleReplaceAll = () => {
    if (!findReplaceState.findText) return;
    
    if (editorRef.current) {
      const content = editorRef.current.innerText;
      const regex = new RegExp(findReplaceState.findText, 'gi');
      const newContent = content.replace(regex, findReplaceState.replaceText);
      editorRef.current.innerText = newContent;
      handleContentChange();
      toast.success('Replaced all occurrences', {
        style: {
          background: '#27272a',
          color: '#e4e4e7'
        }
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case 'p':
            e.preventDefault();
            handlePrint();
            break;
          case 'f':
            e.preventDefault();
            setFindReplaceState(prev => ({ ...prev, isVisible: true }));
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-black">
      <Toolbar
        editorState={editorState}
        onSave={handleSave}
        onPrint={handlePrint}
        onDownload={handleDownload}
        onFindReplace={() => setFindReplaceState(prev => ({ ...prev, isVisible: true }))}
        setEditorState={setEditorState}
      />
      
      <div className="relative flex-1 flex flex-col">
        <div
          ref={editorRef}
          contentEditable
          className="flex-1 p-6 focus:outline-none overflow-auto bg-black text-zinc-300"
          style={{
            fontSize: editorState.fontSize,
            fontFamily: editorState.fontFamily
          }}
          onInput={handleContentChange}
          spellCheck
        />
        
        <FindReplace
          findReplaceState={findReplaceState}
          setFindReplaceState={setFindReplaceState}
          onFind={handleFind}
          onReplace={handleReplace}
          onReplaceAll={handleReplaceAll}
        />
      </div>

      <StatusBar
        wordCount={editorState.wordCount}
        isSaved={editorState.isSaved}
      />
      
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;