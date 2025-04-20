import styled from "styled-components";

const RequestPtoPageContentWrapper = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

const StyledRequestPtoPageContentWrapper = styled(RequestPtoPageContentWrapper)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default StyledRequestPtoPageContentWrapper;
