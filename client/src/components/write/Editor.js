import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import styled from "styled-components";
import Responsive from "../common/Responsive";

const EditorWrapper = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-right: 3rem;
  @media (max-width: 768px) {
    padding-right: 1rem;
  }
`;
const TitleInput = styled.input`
  font-family: "Space Mono", monospace;
  font-size: 2rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid #000;
  margin-bottom: 2rem;
  width: 100%;
  text-align: left;
`;

const QuillWrapper = styled.div`
  text-align: left;
  .ql-editor {
    font-family: "Space Mono", monospace;
    padding: 0;
    min-height: 320px;
    font-size: 1rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0;
  }
`;

const Editor = () => {
  const quillElement = useRef();
  const quillInstance = useRef();

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "bubble",
      placeholder: "Write your content...",
      modules: {
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
        ],
      },
    });
  }, []);

  return (
    <EditorWrapper>
      <TitleInput placeholder="Write your title" />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorWrapper>
  );
};

export default Editor;
