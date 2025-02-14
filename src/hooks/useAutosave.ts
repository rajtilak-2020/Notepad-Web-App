import { useEffect, useCallback } from 'react';
import { EditorState } from '../types';

const AUTOSAVE_INTERVAL = 1000; // 1 second

export const useAutosave = (editorState: EditorState, setEditorState: (state: EditorState) => void) => {
  const saveToLocalStorage = useCallback(() => {
    localStorage.setItem('notepad-content', editorState.content);
    localStorage.setItem('notepad-settings', JSON.stringify({
      fontSize: editorState.fontSize,
      fontFamily: editorState.fontFamily
    }));
    setEditorState({ ...editorState, isSaved: true });
  }, [editorState]);

  useEffect(() => {
    const timer = setInterval(saveToLocalStorage, AUTOSAVE_INTERVAL);
    return () => clearInterval(timer);
  }, [saveToLocalStorage]);

  useEffect(() => {
    const content = localStorage.getItem('notepad-content');
    const settings = JSON.parse(localStorage.getItem('notepad-settings') || '{}');
    
    if (content || settings) {
      setEditorState({
        ...editorState,
        content: content || '',
        fontSize: settings.fontSize || editorState.fontSize,
        fontFamily: settings.fontFamily || editorState.fontFamily,
        isSaved: true
      });
    }
  }, []);

  return { saveToLocalStorage };
};