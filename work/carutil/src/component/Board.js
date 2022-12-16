import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic( import('react-quill'), {
    ssr: false,
    loading: () => <p>loading</p>,
})

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
    //   ['link', 'image', 'video'],
      ['link', 'image'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }

  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    // 'video',
  ]

// export default function Board() {
//     return <QuillNoSSRWrapper theme="snow" />
// }

export default function Board() {
    return <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" />
  }