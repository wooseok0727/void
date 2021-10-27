import React, { useCallback, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import {
  useWriteDispatchContext,
  useWriteStateContext,
} from "../../context/WriteContext";

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
  .ql-editor ol,
  .ql-editor ul {
    padding-left: 0;
  }
`;

const Editor = () => {
  const quillElement = useRef();
  const quillInstance = useRef();

  const writeState = useWriteStateContext();
  const writeDispatch = useWriteDispatchContext();
  const { title, content } = writeState;

  const onChangeField = useCallback(
    ({ name, value }) => writeDispatch({ type: "CHANGE_FIELD", name, value }),
    [writeDispatch]
  );

  useEffect(() => {
    return () => {
      writeDispatch({ type: "INITIALIZE" });
    };
  }, [writeDispatch]);

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

    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChangeField({ name: "content", value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = content;
  }, [content]);

  const onChangeTitle = (e) => {
    onChangeField({ name: "title", value: e.target.value });
  };

  return (
    <EditorWrapper>
      <TitleInput
        placeholder="Write your title"
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorWrapper>
  );
};

export default Editor;
