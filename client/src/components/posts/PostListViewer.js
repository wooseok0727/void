import styled from "styled-components";
import Responsive from "../common/Responsive";
import Button from "../common/Button";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";
import { Link } from "react-router-dom";

const PostListWrapper = styled(Responsive)`
  margin-top: 1rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  font-family: "Space Mono", monospace;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid #000;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      opacity: 0.5;
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const PostItem = ({ post }) => {
  const { createdAt, user, tags, title, content, _id } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo username={user.username} createdAt={new Date(createdAt)} />
      <Tags tags={tags} />
      <p>{content}</p>
    </PostItemBlock>
  );
};

const PostListViewer = ({ posts, loading, error, showWriteButton }) => {
  if (error) {
    return <PostListWrapper>ERROR!</PostListWrapper>;
  }
  return (
    <PostListWrapper>
      <WritePostButtonWrapper>
        {showWriteButton && <Button to="/write">WRITE</Button>}
      </WritePostButtonWrapper>
      {!loading && posts && (
        <div className="list">
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListWrapper>
  );
};

export default PostListViewer;
