import { useCallback, useEffect, useState } from "react";
import { Pet, PetType } from "../types/PetTypes";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/pet`;

const DEFAULT_PET_IMAGE = `${process.env.PUBLIC_URL}${process.env.REACT_APP_DEFAULT_PET_IMAGE}`;
const DEFAULT_DOG_IMAGE = `${process.env.PUBLIC_URL}${process.env.REACT_APP_DEFAULT_DOG_IMAGE}`;
const DEFAULT_CAT_IMAGE = `${process.env.PUBLIC_URL}${process.env.REACT_APP_DEFAULT_CAT_IMAGE}`;

type Props = {
  limit?: number;
};

type ReturnType = {
  pet?: Pet;
  pets: Pet[];
  setSelectedPet: (selectedPetId?: string) => void;
  getPets: (params: { page?: number }) => Promise<Pet[]>;
  createPet: (pet: Pet) => any;
  updatePet: (pet: Pet) => any;
  deletePet: (petId: string) => void;
};

export const usePets = ({ limit = 10 }: Props): ReturnType => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPet] = useState<string>();
  const [pet, setPet] = useState<Pet>();

  const getPets = useCallback(
    async ({ page = 1 }: { page?: number }) => {
      try {
        const { data } = await axios.get<{ ok: boolean; pets: Pet[] }>(
          BASE_URL,
          {
            params: { page, limit },
          }
        );
        return data.ok ? data.pets : [];
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    [limit]
  );

  const getPet = useCallback(async (petId: string) => {
    try {
      const { data } = await axios.get<{ ok: boolean; pet?: Pet }>(
        `${BASE_URL}/${petId}`
      );
      return data.ok ? data.pet : undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }, []);

  useEffect(() => {
    getPets({}).then((fetchedPets) => {
      setPets(fetchedPets);
    });
  }, [getPets]);

  useEffect(() => {
    if (selectedPetId) {
      getPet(selectedPetId).then((fetchedPet) => {
        setPet(fetchedPet);
      });
    }
  }, [selectedPetId, getPet]);

  const getDefaultImage = useCallback((type: PetType) => {
    switch (type) {
      case PetType.DOG:
        return DEFAULT_DOG_IMAGE;
      case PetType.CAT:
        return DEFAULT_CAT_IMAGE;
      default:
        return DEFAULT_PET_IMAGE;
    }
  }, []);

  const parsePet = (pet?: Pet): Pet | undefined => {
    return pet && pet.type
      ? {
          ...pet,
          imageUrl: pet.imageUrl ?? getDefaultImage(pet.type),
        }
      : undefined;
  };

  const createPet = async (pet: Pet) => {
    const response = await axios.post(BASE_URL, pet);
    console.log(response);
  };

  const updatePet = async (pet: Pet) => {
    const url = `${BASE_URL}/${pet.id}`;
    const response = await axios.put(url, pet);
    console.log(response);
  };

  const deletePet = async (petId: string) => {
    const url = `${BASE_URL}/${petId}`;
    const response = await axios.delete(url);
    console.log(response);
  };

  return {
    pets: pets?.map((pet) => parsePet(pet) as Pet),
    getPets,
    setSelectedPet,
    pet: parsePet(pet),
    createPet,
    deletePet,
    updatePet,
  };
};
