export interface EditorState {
  content: string;
  wordCount: number;
  isSaved: boolean;
  fontSize: string;
  fontFamily: string;
}

export interface FindReplaceState {
  findText: string;
  replaceText: string;
  isVisible: boolean;
}