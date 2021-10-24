import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import AuthModal from "./AuthModal";
import { useEffect, useState } from "react";

const AuthFormWrapper = styled.div`
  h3 {
    margin: 0;
    color: #fff;
    margin-bottom: 1rem;
    text-align: left;
  }
  form {
    text-align: center;
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
          <StyledInput
            autoComplete="off"
            name="username"
            onChange={onChange}
            value={form.username || ""}
          />
          <StyledInput
            autoComplete="off"
            name="password"
            type="password"
            onChange={onChange}
            value={form.password || ""}
          />
          {type === "JOIN" && (
            <StyledInput
              autoComplete="off"
              name="passwordConfirm"
              type="password"
              onChange={onChange}
              value={form.passwordConfirm || ""}
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
      <AuthModal visible={modal} onCancel={onCancel} description={error} />
    </>
  );
};

export default AuthForm;
