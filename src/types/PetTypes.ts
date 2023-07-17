export enum PetType {
  DOG = "DOG",
  CAT = "CAT",
  OTHER = "OTHER",
}

export type Pet = {
  id?: string;
  name?: string;
  description?: string;
  type?: PetType;
  imageUrl?: string;
};
