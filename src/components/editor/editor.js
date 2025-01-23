import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function CustomEditor() {
  const editorRef = useRef(null);
  
  // Function to log the editor content
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // Custom image upload handler function
  const imageUploadHandler = (blobInfo, success, failure, progress) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', 'YOUR_IMAGE_UPLOAD_URL');

    xhr.upload.onprogress = (e) => {
      progress((e.loaded / e.total) * 100);
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const json = JSON.parse(xhr.responseText);
        if (json && typeof json.location === 'string') {
          success(json.location);
        } else {
          failure('Invalid JSON: ' + xhr.responseText);
        }
      } else {
        failure('HTTP Error: ' + xhr.status);
      }
    };

    xhr.onerror = () => {
      failure('Image upload failed due to a XHR error.');
    };

    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    xhr.send(formData);
  };

  return (
    <>
    
    <div className='my-28 md:w-2/3 mx-auto w-[90%]'>
    <h1 className='text-red-500 text-center md:hidden text-sm pb-5'>We prefer to use Laptop to write better Blogs</h1>
      <Editor
        apiKey='qsjlnjqgv2umc999gwhw0tbqj81shxf6m09l1g3blxme8uut' // Your API key
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p>Start Writing Your Blog</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | image | help', // Added 'image' to toolbar
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
          images_upload_handler: imageUploadHandler, // Custom image upload handler
        }}
      />
      <button className='bg-black hover:bg-white hover:text-black border border-black text-white mt-2 px-2 py-1 rounded-md' onClick={log}>Publish</button>
    </div>
    </>
  );
}
