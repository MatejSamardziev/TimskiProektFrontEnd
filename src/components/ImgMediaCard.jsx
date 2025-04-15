import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ImgMediaCard({ days }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="PTO"
        height="140"
        image="/PTO-1024x586.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Available vacation days: {days}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          The number of vacation days you have left in the calendar year
          (Consult with manager if requesting more)
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
