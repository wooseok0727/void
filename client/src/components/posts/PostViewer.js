import styled from "styled-components";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";
import { Helmet } from "react-helmet-async";

const PostViewerWrapper = styled(Responsive)`
  font-family: "Space Mono", monospace;
  margin-top: 2rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid #000;
  padding-bottom: 1rem;
  margin-bottom: 3rem;
  font-family: "Space Mono", monospace;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-family: "Space Mono", monospace;
  font-size: 1.3125rem;
  color: #000;
  li {
    margin-left: 2.5rem;
  }
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerWrapper>404 NOT FOUND</PostViewerWrapper>;
    }
    return <PostViewerWrapper>ERROR!</PostViewerWrapper>;
  }

  if (loading || !post) {
    return null;
  }

  const { title, content, user, createdAt, tags } = post;

  return (
    <PostViewerWrapper>
      <Helmet>
        <title>{title} - VOID</title>
      </Helmet>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo username={user.username} createdAt={createdAt} hasMarginTop />
        <Tags tags={tags} />
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: content }} />
    </PostViewerWrapper>
  );
};

export default PostViewer;
