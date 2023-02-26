import { EditorState } from 'draft-js';
import { createContext, Dispatch, SetStateAction } from 'react';
import { ImportData, KindOfData } from '../types';

interface InserterContext {
  dataKind: KindOfData | undefined;
  title: string;
  date: Date | null;
  filename: string;
  parsedData?: ImportData;
  optionId: number;
  editorState: EditorState;
  updateParsedData: (
    id: number,
    key: 'category' | 'subcategory' | 'extraInfo',
    value: any
  ) => void;
  setDataKind: Dispatch<SetStateAction<KindOfData | undefined>>;
  setFilename: Dispatch<SetStateAction<string>>;
  setParsedData: Dispatch<SetStateAction<ImportData | undefined>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  setDate: Dispatch<SetStateAction<Date | null>>;
  setOptionId: Dispatch<SetStateAction<number>>;
}

export const InserterContext = createContext<InserterContext>({
  dataKind: undefined,
  title: '',
  filename: '',
  date: null,
  parsedData: [],
  optionId: -1,
  editorState: EditorState.createEmpty(),
  setDataKind: () => ({}),
  setFilename: () => ({}),
  setParsedData: () => ({}),
  setDate: () => ({}),
  setTitle: () => ({}),
  setOptionId: () => ({}),
  setEditorState: () => ({}),
  updateParsedData: () => ({}),
});
