import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { PetType } from "../../types/PetTypes";
import { capitalize } from "lodash";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePets } from "../../hooks/usePets";

export const CreateUpdatePet = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [type, setType] = useState<PetType>();
  const [isLoading, setIsLoading] = useState(false);

  const { createPet, setSelectedPet, pet, updatePet } = usePets({});
  const navigate = useNavigate();
  const { id: petId } = useParams();

  const isFormValid = useMemo(() => name && type, [name, type]);

  useEffect(() => {
    setSelectedPet(petId);
  }, [setSelectedPet, petId]);

  useEffect(() => {
    if (pet) {
      const isDefaultImageUrl = pet.imageUrl?.startsWith(
        process.env.REACT_APP_ASSETS_FOLDER_PATH ?? "-"
      );
      setName(pet.name ?? "");
      setDescription(pet.description ?? "");
      setImageUrl(isDefaultImageUrl ? "" : pet.imageUrl ?? "");
      setType(pet.type);
    }
  }, [JSON.stringify(pet)]);

  const onSaveClick = async () => {
    if (!name || !type) {
      return;
    }
    setIsLoading(true);
    if (pet?.id) {
      await updatePet({
        id: pet?.id,
        name,
        type,
        description,
        imageUrl: imageUrl || undefined,
      });
    } else {
      await createPet({
        name,
        type,
        description,
        imageUrl,
      });
    }
    setIsLoading(false);
    navigate("/");
  };

  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="name"
            label="Name*"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type*</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value as PetType)}
              disabled={isLoading}
            >
              {Object.values(PetType).map((type) => (
                <MenuItem key={type} value={type}>
                  {capitalize(type)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="description"
            label="Description"
            multiline
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="imageUrl"
            label="Image Url"
            variant="outlined"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
            disabled={isLoading}
          />
        </Grid>
      </Grid>
      <Box mt={2} display="flex" gap="10px">
        <Button variant="outlined" component={Link} to="/" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!isFormValid || isLoading}
          onClick={onSaveClick}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
