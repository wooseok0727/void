import styled, { css, keyframes } from "styled-components";
import btn from "../../assets/btn.png";

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
  margin-top: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 1px;
`;

const StyledButton = styled.button`
  font-family: "Space Mono", monospace;
  font-weight: bold;
  font-size: 1rem;
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

const Button = (props) => {
  return (
    <ButtonBox>
      <ButtonMask reverse={props.reverse}>{props.children}</ButtonMask>
      <StyledButton {...props} />
    </ButtonBox>
  );
};

export default Button;
