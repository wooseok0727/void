import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";
import { Link, useLocation } from "react-router-dom";
import {
  useUserStateContext,
  useUserDispatchContext,
} from "../../context/UserContext";
import { logoutAPI } from "../../modules/auth";

const HeaderWarpper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 10;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  padding-left: 0.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background: #fff;
  .logo_box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Space Mono", monospace;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
    border: 2px solid #000;
    width: 110px;
    height: 40px;
    overflow: visible;
    z-index: 0;
    &:hover {
      ::before {
        width: 0;
      }
      ::after {
        height: 0;
      }
    }
  }

  .logo_box::before,
  .logo_box::after {
    position: absolute;
    background: #fff;
    border: none;
    transition: 0.5s;
    content: "";
    z-index: -1;
    width: 120px;
    height: 50px;
  }

  .right {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-family: "Space Mono", monospace;
  font-weight: bold;
  margin-right: 1rem;
  margin-top: 1rem;
`;

const Header = () => {
  const { pathname } = useLocation();
  const paths = ["/login", "/register"];
  const fade = paths.some((path) => path === pathname);

  const userState = useUserStateContext();
  const userDispatch = useUserDispatchContext();

  const { user } = userState;

  const onLogout = () => {
    logoutAPI(userDispatch);
  };

  return (
    <>
      <HeaderWarpper>
        <Wrapper>
          <Link to="/" className="logo_box">
            VOID&#125;&#125;
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>[ {user.username} ]</UserInfo>
              <Button onClick={onLogout}>LOGOUT</Button>
            </div>
          ) : (
            <div className="right">
              {!fade && <Button to="/login">LOGIN</Button>}
            </div>
          )}
        </Wrapper>
      </HeaderWarpper>
      <Spacer />
    </>
  );
};

export default Header;
