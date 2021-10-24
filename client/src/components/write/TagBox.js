import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";

const TagBoxWrapper = styled.div`
  width: 100%;
  border-top: 1px solid #000;
  padding-top: 2rem;

  h4 {
    font-family: "Space Mono", monospace;
    color: #000;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid #000;
  input {
    padding-left: 0.5rem;
    flex: 1;
    min-width: 0;
    font-family: "Space Mono", monospace;
    outline: none;
    border: none;
    font-size: 0.8rem;
  }
  .btn_box div {
    margin-top: 0;
    height: 100%;
    border-radius: 0;
  }
  .btn_box div span {
    margin-top: 0.2rem;
  }
`;

const Tag = styled.div`
  color: #000;
  cursor: pointer;
  margin-right: 0.5rem;
  font-family: "Space Mono", monospace;
  &:hover {
    opacity: 0.5;
  }
`;

const TagListWrapper = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

const TagList = React.memo(({ tags, onRemove }) => (
  <TagListWrapper>
    {tags.map((tag) => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListWrapper>
));

const TagBox = () => {
  const [input, setInput] = useState("");
  const [localTags, setLocalTags] = useState([]);

  const insertTag = useCallback(
    (tag) => {
      if (!tag) return;
      if (localTags.includes(tag)) return;
      setLocalTags([...localTags, tag]);
    },
    [localTags]
  );

  const onRemove = useCallback(
    (tag) => {
      setLocalTags(localTags.filter((t) => t !== tag));
    },
    [localTags]
  );

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertTag(input.trim());
      setInput("");
    },
    [input, insertTag]
  );

  return (
    <TagBoxWrapper>
      <h4>Tag</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder="Please enter a tag"
          value={input}
          onChange={onChange}
        />
        <div className="btn_box">
          <Button>ADD</Button>
        </div>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxWrapper>
  );
};

export default TagBox;
