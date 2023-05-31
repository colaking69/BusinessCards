import React, { useEffect, useState } from "react";
import useCards from "../hooks/useCards";

const useGetFav = () => {
  const { value, handleGetCards } = useCards();
  const { cards } = value;

  const [searchUser, setSearchUser] = useState(""); // State variable for search query
  const [filteredFavCards, setFilteredFavCards] = useState(cards); // State variable for filtered cards

  useEffect(() => {
    handleGetCards();
  }, []);

  useEffect(() => {
    const filterCards = () => {
      if (cards === undefined) {
        setFilteredFavCards(null);
      } else if (searchUser) {
        setFilteredFavCards(cards);
      } else {
        const filtered = cards?.filter(
          (card) => card.title && card.likes.includes(searchUser)
        );
        setFilteredFavCards(filtered || null);
      }
    };

    filterCards();
  }, [cards, searchUser]);

  const getUserId = (userId: string) => {
    setSearchUser(userId);
  };

  return {
    getUserId,
    searchUser,
    setSearchUser,
    filteredFavCards,
    setFilteredFavCards,
  };
};

export default useGetFav;
