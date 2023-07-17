import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Pet } from "../../types/PetTypes";
import { useNavigate } from "react-router-dom";

export const PetCard = ({ pet }: { pet: Pet }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ flex: "1 1 300px", maxWidth: "300px" }}>
      <CardActionArea onClick={() => navigate("/" + pet.id)}>
        <CardMedia
          component="img"
          height="140"
          image={pet.imageUrl}
          alt={`${pet.name}-image`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pet.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pet.description ?? ""}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
