import React from 'react';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(
    () => import('react-quill'),
    { ssr: false }
)
import "quill/dist/quill.bubble.css"
import "quill/dist/quill.snow.css"

function TextEditor({content, setContent}) {
    return <ReactQuill value={content}
            onChange={setContent} />

}

export default TextEditor;