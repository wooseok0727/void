import styled from "styled-components";

const ResponsiveWrapper = styled.div`
  padding-right: 1rem;
  padding-left: 1rem;
  width: 1024px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Responsive = ({ children, ...rest }) => {
  return <ResponsiveWrapper {...rest}>{children}</ResponsiveWrapper>;
};

export default Responsive;
