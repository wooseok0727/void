import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const AuthFormWrapper = styled.div`
  h3 {
    margin: 0;
    color: #fff;
    margin-bottom: 1rem;
    text-align: left;
  }
`;

const StyledInput = styled.input`
  font-family: "Space Mono", monospace;
  font-size: 1rem;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  background: transparent;
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    font-weight: bold;
    color: #fff;
    text-decoration: underline;
  }
`;

const AuthForm = ({ type }) => {
  return (
    <AuthFormWrapper>
      <h3>"{type}"</h3>
      <form>
        <StyledInput autoComplete="off" name="username" />
        <StyledInput autoComplete="off" name="password" type="password" />
        {type === "JOIN" && (
          <StyledInput
            autoComplete="off"
            name="passwordConfirm"
            type="password"
          />
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
  );
};

export default AuthForm;
