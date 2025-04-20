import styled from "styled-components";
import CircleComponent from "./CircleComponent.jsx";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Legend = ({ className }) => {
  return (
    <div className={className}>
      <CircleComponent color="Green"></CircleComponent>
      <Typography variant="body2">Accepted</Typography>
      <CircleComponent color="Orange"></CircleComponent>
      <Typography variant="body2">Pending</Typography>
      <CircleComponent color="Red"></CircleComponent>
      <Typography variant="body2">Rejected</Typography>
    </div>
  );
};

const styledLegend = styled(Legend)`
  display: flex;
  gap: 10px;
`;
export default styledLegend;
