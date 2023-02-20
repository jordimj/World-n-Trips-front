import { EditorState } from 'draft-js';
import React, { Dispatch, SetStateAction } from 'react';
import { ImportData } from '../../types';
import DataParser from '../DataParser/DataParser';
import Journal from '../Journal/Journal';

interface Step2Props {
  filename: string;
  setFilename: Dispatch<SetStateAction<string>>;
  setParsedData: Dispatch<SetStateAction<ImportData | undefined>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  isJournal: boolean;
}

function Step2(props: Step2Props) {
  const {
    isJournal,
    title,
    setTitle,
    editorState,
    setEditorState,
    filename,
    setFilename,
    setParsedData,
  } = props;

  return isJournal ? (
    <Journal
      title={title}
      setTitle={setTitle}
      editorState={editorState}
      setEditorState={setEditorState}
    />
  ) : (
    <>
      <DataParser setFilename={setFilename} setParsedData={setParsedData!} />
      {filename && <h5>Selected file: {filename}</h5>}
    </>
  );
}

export default Step2;
