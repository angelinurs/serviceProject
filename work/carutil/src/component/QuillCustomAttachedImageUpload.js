import fetch from 'isomorphic-unfetch';
import { useQuill } from "react-quilljs";
import { useEffect } from "react";

const SAVE_IMAGE_URL = '/rest/bbs/saveImage';

const QuillCustomImageUpload = () => {
    const { quill, quillRef } = useQuill();

    // insert image( selected by user ) to quill
    const insertToEditor = (url) => {
        const range = quill.getSelection();

        quill.insertEmbed( range.index, 'image', url );
    };

    // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc...
    const saveToServer = async ( file ) => {
        const body = new FormData();
        body.append('s_file', file );

        const res = await fetch( SAVE_IMAGE_URL, { method: 'POST', body });
        insertToEditor( res.uploadedImageUrl );
    }

    // Open Dialog to select Image File
    const selectLocalImage = () => {
        const input = document.createElement( 'input' );
        input.setAttribute( 'type', 'file' );
        input.setAttribute( 'accept', 'image/*' );
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            saveToServer( file );
        };
    }

    useEffect(()=>{
        if( quill ) {
            // Add custom handler for image Upload
            quill.getModule( 'toolbar' ).addHandler( 'image', selectLocalImage );
            console.log( quill.root.innerHtml );
        }
    }, [quill]);

    return (
        <div style={{width: 500, height:300, border:'1px solid lightgray' }} >
            <div ref={quillRef} />
        </div>
    );


}

export default QuillCustomImageUpload;