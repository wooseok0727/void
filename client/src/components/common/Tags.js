import styled from "styled-components";
import { Link } from "react-router-dom";

const TagsWrapper = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: #000;
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const Tags = ({ tags }) => {
  return (
    <TagsWrapper>
      {tags.map((tag) => (
        <Link className="tag" to={`/?tag=${tag}`} key={tag}>
          #{tag}
        </Link>
      ))}
    </TagsWrapper>
  );
};

export default Tags;
