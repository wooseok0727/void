import styled from "styled-components";
import { Link } from "react-router-dom";
import ink from "../../assets/ink.mp4";

const AuthTempleteWrapper = styled.div`
  position: absolute;
  top: 4rem;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  video {
    mix-blend-mode: multiply;
    position: absolute;
    top: 8%;
    left: 2.5%;
    width: 100%;
    height: 100%;
    z-index: -1;
    @media only screen and (min-width: 992px) and (max-width: 1199px) {
      top: 6%;
      left: -6.5%;
      width: 120%;
    }
    @media only screen and (min-width: 768px) and (max-width: 991px) {
      top: 5%;
      left: -16%;
      width: 140%;
    }
    @media only screen and (max-width: 767px) {
      top: 9%;
      left: -195%;
      width: 500%;
    }
  }
`;

const AuthBox = styled.div`
  .logo {
    font-size: 2rem;
    padding-bottom: 2rem;
    font-weight: bold;
    letter-spacing: 1px;
    text-align: center;
  }
  width: 360px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  /* border: 1px solid #000; */
  padding: 2rem;
  border-radius: 2px;
  font-family: "Space Mono", monospace;
  color: #fff;
`;

const AuthTemplete = ({ children }) => {
  return (
    <AuthTempleteWrapper>
      <video autoPlay muted>
        <source src={ink} type="video/mp4" />
      </video>
      <AuthBox>
        <div className="logo">
          <Link to="/">VOID&#125;&#125;</Link>
        </div>
        {children}
      </AuthBox>
    </AuthTempleteWrapper>
  );
};

export default AuthTemplete;
