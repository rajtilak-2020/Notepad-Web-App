import { useEffect, useCallback } from 'react';
import { EditorState } from '../types';

export function useAutosave(editorState: EditorState, setEditorState: (state: EditorState) => void) {
  // Function to save content to localStorage
  const saveToLocalStorage = useCallback(() => {
    localStorage.setItem('notepad-content', JSON.stringify(editorState));
    localStorage.setItem('isSaved', 'true'); // Save state as well
    setEditorState({ ...editorState, isSaved: true });  // <-- Fixed here
  }, [editorState, setEditorState]);

  // Load saved content when the component mounts
  useEffect(() => {
    const savedContent = localStorage.getItem('notepad-content');
    if (savedContent) {
      const parsedContent: EditorState = JSON.parse(savedContent);
      setEditorState({ ...parsedContent, isSaved: true });  // <-- Fixed here
    }
  }, [setEditorState]);

  // Autosave every 5 seconds if there are unsaved changes
  useEffect(() => {
    const autosaveInterval = setInterval(() => {
      if (!editorState.isSaved) {
        saveToLocalStorage();
      }
    }, 5000);

    return () => clearInterval(autosaveInterval);
  }, [editorState, saveToLocalStorage]);

  // Save before closing the tab or refreshing
  useEffect(() => {
    const handleUnload = () => {
      if (!editorState.isSaved) {
        saveToLocalStorage();
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [saveToLocalStorage]);

  return { saveToLocalStorage };
}
