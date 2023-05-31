import React, { useEffect } from "react";
import { useUser } from "../../users/providers/UserProvider";
import useCards from "../hooks/useCards";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import CardsFeedback from "../components/CardsFeedback";
import PageHeader from "../../components/PageHeader";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import useSearch from "../hooks/useSearch";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const MyCardsPage = () => {
  const { user } = useUser();
  const { value, handleGetMyCards, handleDeleteCard } = useCards();
  const { cards, error, isLoading } = value;
  const navigate = useNavigate();

  const { filteredCards, searchQuery, handleSearch } = useSearch("myCards");

  const onDeleteCard = async (cardId: string) => {
    await handleDeleteCard(cardId);
    await handleGetMyCards();
  };

  if (!user || !user.isBusiness)
    return <Navigate replace to={ROUTES.MY_CARDS} />;

  return (
    <Container sx={{ position: "relative", minHeight: "92vh" }}>
      <PageHeader
        title="My Cards Page"
        subtitle="Here you can find your business cards"
      />

      <Box
        display="inline-flex"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <FormControl variant="standard">
          <OutlinedInput
            sx={{ backgroundColor: "#e3f2fd" }}
            placeholder="Search"
            size="small"
            value={searchQuery}
            onChange={handleSearch}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>

      {filteredCards && (
        <Fab
          onClick={() => navigate(ROUTES.CREATE_CARD)}
          color="primary"
          aria-label="add"
          sx={{
            position: "absolute",
            bottom: 75,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>
      )}
      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={filteredCards}
        onDelete={onDeleteCard}
      />
    </Container>
  );
};

export default MyCardsPage;
