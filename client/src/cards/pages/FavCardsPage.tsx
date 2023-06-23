import { useUser } from "../../users/providers/UserProvider";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import CardsFeedback from "../components/CardsFeedback";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";
import useSearch from "../hooks/useSearch";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import useGetFav from "../hooks/useGetFav";

const FavCardsPage = () => {
  const { user } = useUser();
  const { value, handleGetCards, handleDeleteCard, handleGetFavCard } =
    useCards();
  const { cards, error, isLoading, setCards } = value;

  const { filteredCards, handleSearch, searchQuery, filterCards } =
    useSearch("favCards");

  // useEffect(() => {
  //   user && handleGetFavCard(user?._id);
  // }, []);

  const onDeleteCard = async (cardId: string) => {
    await handleDeleteCard(cardId);
    user && (await handleGetFavCard(user?._id));
  };

  const onLikedCard = async () => {
    // user && (await handleGetFavCard(user?._id));
    filterCards();
  };

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container>
      <PageHeader
        title="Cards Page"
        subtitle="On this page you can find all business cards from all categories"
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

      {/* Cards feedback component */}
      <CardsFeedback
        cards={filteredCards} // Render filtered cards instead of all cards
        error={error}
        isLoading={isLoading}
        onDelete={onDeleteCard}
        onLike={() => onLikedCard()}
      />
    </Container>
  );
};

export default FavCardsPage;
