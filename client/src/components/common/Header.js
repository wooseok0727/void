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
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo_box {
    font-family: "Space Mono", monospace;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
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
