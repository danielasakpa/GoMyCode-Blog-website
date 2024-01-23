import { useRef } from "react";
import { Editor as ED } from "@tinymce/tinymce-react";

function Editor({ formData, setFormData }) {
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    setFormData({ ...formData, description: content });
  };

  return (
    <>
      <ED
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "codesample",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          codesample_languages: [
            { text: "HTML/XML", value: "markup" },
            { text: "JavaScript", value: "javascript" },
            { text: "CSS", value: "css" },
            { text: "PHP", value: "php" },
            { text: "Ruby", value: "ruby" },
            { text: "Python", value: "python" },
            { text: "Java", value: "java" },
            { text: "C", value: "c" },
            { text: "C#", value: "csharp" },
            { text: "C++", value: "cpp" },
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent codesample image | " +
            "removeformat | help",
          content_style:
            "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
        }}
        value={formData.description}
        onEditorChange={handleEditorChange}
      />
    </>
  );
}

export default Editor;
