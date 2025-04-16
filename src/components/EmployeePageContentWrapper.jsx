import styled from "styled-components";

const EmployeePageContentWrapper = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const StyledEmployeePageContentWrapper = styled(
  EmployeePageContentWrapper,
)`
  display: flex;

  gap: 10px;
`;

export default StyledEmployeePageContentWrapper;
