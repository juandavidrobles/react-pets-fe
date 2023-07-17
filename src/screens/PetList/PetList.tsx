import React from "react";
import { usePets } from "../../hooks/usePets";
import { PetCard } from "../../components/PetCard/PetCard";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const PetList = () => {
  const { pets } = usePets({});
  return (
    <>
      <Box mt={2}>
        <Button component={Link} variant="contained" to="/create">
          Add pet
        </Button>
      </Box>
      <Box display="flex" gap="20px" flexWrap="wrap" mt={2} mb={5}>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </Box>
    </>
  );
};
