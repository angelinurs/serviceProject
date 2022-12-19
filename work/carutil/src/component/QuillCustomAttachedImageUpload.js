import axios from "axios";
import { useQuill } from "react-quilljs";

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
        body.append('file', file );

        const res = await axios.post()
    }

    return (
        <>
            <h1>a</h1>
        </>
    );


}

export default QuillCustomImageUpload;