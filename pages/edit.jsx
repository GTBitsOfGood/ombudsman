import React, { useState, useContext } from 'react';
import { PdfContext } from './context/pdf-context';
import { EditorState } from 'draft-js';
import Loading from '../client/components/Loading/Loading';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);

const EditPage = () => {
  const [loading, pdfs, categories] = useContext(PdfContext);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  return (
    <>
      {loading ? (<Loading />) : (
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      )}
    </>);
};

export default EditPage;