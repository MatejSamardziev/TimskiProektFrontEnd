import styled from "styled-components";

const HomePageContentWrapper = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

const StyledHomePageContentWrapper = styled(HomePageContentWrapper)``;

export default StyledHomePageContentWrapper;
