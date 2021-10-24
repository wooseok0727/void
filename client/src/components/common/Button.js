import styled, { css, keyframes } from "styled-components";
import btn from "../../assets/btn.png";
import { withRouter } from "react-router-dom";

const ButtonFadeOut = keyframes`
    from {
        mask-position : 0 0;
    }
    to {
        mask-position : 100% 0;
    }
`;
const ButtonFadeIn = keyframes`
    from {
        mask-position: 100% 0;
    }
    to {
        mask-position: 0 0;
    }
`;

const ButtonBox = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  font-family: "Space Mono", monospace;
  transition: 0.5s;
  border-radius: 8px;
  width: 4.375rem;
  height: 2.5rem;
  margin-top: 1rem;
`;

const ButtonMask = styled.span`
  position: absolute;
  color: ${(props) => (props.reverse ? "#fff" : "#000")};
  width: 101%;
  margin-top: 0.6rem;
  font-weight: bold;
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-align: center;
`;

const StyledButton = styled.button`
  font-family: "Space Mono", monospace;
  font-weight: bold;
  font-size: 0.9rem;
  letter-spacing: 1px;
  width: 101%;
  height: 100%;
  cursor: pointer;
  mask: url(${btn});
  mask-size: 7100% 100%;
  border: none;
  ${(props) =>
    props.reverse
      ? css`
          color: #000;
          background: #fff;
          animation: ${ButtonFadeIn} 0.7s steps(70) forwards reverse;
          &:hover {
            animation: ${ButtonFadeOut} 0.7s steps(70) forwards reverse;
          }
        `
      : css`
          color: #fff;
          background: #000;
          animation: ${ButtonFadeOut} 0.7s steps(70) forwards;
          &:hover {
            animation: ${ButtonFadeIn} 0.7s steps(70) forwards;
          }
        `}
`;

const Button = ({ to, history, reverse, ...rest }) => {
  const onClick = (e) => {
    if (to) {
      history.push(to);
    }
    if (rest.onClick) {
      rest.onClick(e);
    }
  };

  return (
    <ButtonBox>
      <ButtonMask reverse={reverse}>{rest.children}</ButtonMask>
      <StyledButton {...rest} onClick={onClick} />
    </ButtonBox>
  );
};

export default withRouter(Button);
