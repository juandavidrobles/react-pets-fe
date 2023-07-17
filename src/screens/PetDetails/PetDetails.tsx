import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePets } from "../../hooks/usePets";
import { Box, Button } from "@mui/material";

export const PetDetails = () => {
  const { id: petId } = useParams();
  const { setSelectedPet, pet, deletePet } = usePets({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedPet(petId);
  }, [petId, setSelectedPet]);

  const onEditClick = () => {
    if (!pet?.id) {
      return;
    }
    navigate("/edit/" + pet.id);
  };

  const onDeleteClick = () => {
    if (!pet?.id) {
      return;
    }
    setIsLoading(true);
    deletePet(pet?.id);
    setIsLoading(false);
    navigate("/");
  };

  return (
    <>
      {!pet && <Box mt={3}>Pet not found</Box>}
      {pet && (
        <Box mt={3}>
          <strong>{pet?.name}</strong>
          <br />
          <br />
          <img
            style={{ maxWidth: "400px" }}
            src={pet?.imageUrl}
            alt={`${pet?.name}`}
          />
          <p>{pet?.description}</p>
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              onClick={onEditClick}
              disabled={isLoading}
              color="primary"
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              onClick={onDeleteClick}
              disabled={isLoading}
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
