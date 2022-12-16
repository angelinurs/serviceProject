import 'react-quill/dist/quill.snow.css'

import { useEffect } from "react";

import { useQuill } from "react-quilljs";

export default function QuillBoard() {
    const { quill, quillRef } = useQuill();

    console.log( '!' );

    useEffect( () => {
        console.log( '!!' );

        if( quill ) {
            quill.setText( "123" );
            quill.clipboard.dangerouslyPasteHTML('<h1>React Hook for Quill!</h1>');
            quill.on('text-change', (delta, oldDelta, source) => {
                console.log('Text change!');
                console.log(quill.getText()); // Get text only
                console.log(quill.getContents()); // Get delta contents
                console.log(quill.root.innerHTML); // Get innerHTML using quill
                console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
              });
        }
    } );

    return (
        <div style={{ width: "600px", height: "300px" }}>
            <div ref={quillRef} />
        </div>
    );
}