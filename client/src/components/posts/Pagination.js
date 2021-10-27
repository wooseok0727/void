import styled from "styled-components";
import qs from "qs";
import Button from "../common/Button";
import { usePostsStateContext } from "../../context/PostsContext";
import { withRouter } from "react-router";

const PaginationWrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .page_btn {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      margin-top: 0;
      margin-bottom: 1.5rem;
    }
  }
`;

const PageNumber = styled.div`
  font-family: "Space Mono", monospace;
`;

const buildLink = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page });
  return username ? `/@${username}?${query}` : `/?${query}`;
};

const Pagination = ({ location, match }) => {
  const postsState = usePostsStateContext();
  const { lastPage, posts, loading } = postsState;

  if (!posts || loading) return null;

  const { username } = match.params;

  const { tag, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const intPage = parseInt(page, 10);

  return (
    <PaginationWrapper>
      <div className="page_btn">
        <Button
          disabled={intPage === 1}
          to={
            intPage === 1
              ? undefined
              : buildLink({ username, tag, page: intPage - 1 })
          }
        >
          PREV
        </Button>
        <PageNumber>{intPage}</PageNumber>
        <Button
          disabled={intPage === lastPage}
          to={
            intPage === lastPage
              ? undefined
              : buildLink({ username, tag, page: intPage + 1 })
          }
        >
          NEXT
        </Button>
      </div>
    </PaginationWrapper>
  );
};

export default withRouter(Pagination);
