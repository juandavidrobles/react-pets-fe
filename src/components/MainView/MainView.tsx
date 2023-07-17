import React from "react";
import { PetList } from "../../screens/PetList/PetList";
import { Container } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PetDetails } from "../../screens/PetDetails/PetDetails";
import { CustomAppBar } from "../CustomAppBar/CustomAppBar";
import { CreateUpdatePet } from "../../screens/CreateUpdatePet/CreateUpdatePet";

export const MainView = () => {
  return (
    <Router>
      <CustomAppBar />
      <Container>
        <Routes>
          <Route path="/" element={<PetList />} />
          <Route path="/create" element={<CreateUpdatePet />} />
          <Route path="/edit/:id" element={<CreateUpdatePet />} />
          <Route path="/:id" element={<PetDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};
