import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import AuthModal from "./AuthModal";
import { useEffect, useState } from "react";

const InputAni = keyframes`
    50% {
      d: path("M2,2 C21,17 46,25 74,25 C102,25 118,25 120,25")
    }
`;
const AuthFormWrapper = styled.div`
  h3 {
    margin: 0;
    color: #fff;
    margin-bottom: 1.5rem;
    text-align: left;
  }
  form {
    text-align: center;
  }
`;

const InputWarpper = styled.div`
  position: relative;
  font-family: "Space Mono", monospace;
  .label {
    position: absolute;
    top: 0.1rem;
    left: 0;
    font-size: 0.9rem;
    transform-origin: 0 0;
    transition: all 0.2s ease;
  }
  .border {
    position: absolute;
    bottom: 0.49rem;
    left: 7.5rem;
    height: 0.125rem;
    right: 0;
    background: #fff;
  }
  & + & {
    margin-top: 1rem;
  }
  svg {
    position: absolute;
    left: 0;
    bottom: 0.49rem;
    height: 1.625rem;
    fill: none;
    path {
      stroke: #fff;
      stroke-width: 2;
      d {
        transition: all 0.2s ease;
      }
    }
  }
  input:focus + span,
  input.focus + span {
    transform: translateY(-1.2rem) scale(0.8);
    transition-delay: 0.1s;
    color: #c8ccd4;
  }
  input:focus + span + svg path,
  input.focus + span + svg path {
    animation: ${InputAni} 0.4s ease;
  }
`;

const StyledSvg = styled.svg`
  width: 120px;
  height: 26px;
`;

const StyledInput = styled.input`
  position: relative;
  z-index: 1;
  font-family: "Space Mono", monospace;
  font-size: 0.9rem;
  color: #fff;
  border: none;
  margin-bottom: 0.5rem;
  outline: none;
  width: 100%;
  background: transparent;
`;

const Footer = styled.div`
  margin-top: 1rem;
  text-align: right;
  a {
    font-weight: bold;
    color: #fff;
    text-decoration: underline;
    font-size: 0.9rem;
  }
`;

const AuthForm = ({ type, form, onChange, onSubmit, error, setError }) => {
  const [modal, setModal] = useState(false);

  const onCancel = () => {
    setError(null);
    setModal(false);
  };

  useEffect(() => {
    if (error) {
      setModal(true);
    }
  }, [error]);

  return (
    <>
      <AuthFormWrapper>
        <h3>"{type}"</h3>
        <form onSubmit={onSubmit}>
          <InputWarpper>
            <StyledInput
              autoComplete="off"
              name="username"
              onChange={onChange}
              value={form.username || ""}
              className={form.username && "focus"}
            />
            <span className="label">ID</span>
            <StyledSvg viewBox="0 0 120 26">
              <path d="M0,25 C21,25 46,25 74,25 C102,25 118,25 120,25"></path>
            </StyledSvg>
            <span className="border"></span>
          </InputWarpper>
          <InputWarpper>
            <StyledInput
              autoComplete="off"
              name="password"
              type="password"
              onChange={onChange}
              value={form.password || ""}
              className={form.password && "focus"}
            />
            <span className="label">PASSWORD</span>
            <StyledSvg viewBox="0 0 120 26">
              <path d="M0,25 C21,25 46,25 74,25 C102,25 118,25 120,25"></path>
            </StyledSvg>
            <span className="border"></span>
          </InputWarpper>

          {type === "JOIN" && (
            <InputWarpper>
              <StyledInput
                autoComplete="off"
                name="passwordConfirm"
                type="password"
                onChange={onChange}
                value={form.passwordConfirm || ""}
                className={form.passwordConfirm && "focus"}
              />
              <span className="label">PASSWORD CONFIRM</span>
              <StyledSvg viewBox="0 0 120 26">
                <path d="M0,25 C21,25 46,25 74,25 C102,25 118,25 120,25"></path>
              </StyledSvg>
              <span className="border"></span>
            </InputWarpper>
          )}
          <Button reverse>{type}</Button>
        </form>
        <Footer>
          {type === "JOIN" ? (
            <Link to="/login">LOGIN</Link>
          ) : (
            <Link to="/register">JOIN</Link>
          )}
        </Footer>
      </AuthFormWrapper>
      <AuthModal visible={modal} onCancel={onCancel} description={error} />
    </>
  );
};

export default AuthForm;
