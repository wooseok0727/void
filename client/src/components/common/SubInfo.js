import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const SubInfoWrapper = styled.div`
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color:#000;

  span + span::before {
    color: #000;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: "\\B7";
  }
`;

const SubInfo = ({ username, createdAt, hasMarginTop }) => {
  return (
    <SubInfoWrapper hasMarginTop={hasMarginTop}>
      <span>
        <b>
          <Link to={`/@${username}`}>{username}</Link>
        </b>
      </span>
      <span>{new Date(createdAt).toLocaleDateString()}</span>
    </SubInfoWrapper>
  );
};

export default SubInfo;
