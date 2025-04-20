import styled from "styled-components";
import { useState } from "react";

const YourCalendarPageContentWrapper = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

const styledYourCalendarPageContentWrapper = styled(
  YourCalendarPageContentWrapper,
)`
  display: flex;
`;
export default styledYourCalendarPageContentWrapper;
