import React, { useEffect, useState } from "react";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";

const useSearch = (whatHandle?: string) => {
  const { value, handleGetFavCard, handleGetCards, handleGetMyCards } =
    useCards();
  const { cards } = value;

  const { user } = useUser();

  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [filteredCards, setFilteredCards] = useState(cards); // State variable for filtered cards

  useEffect(() => {
    if (whatHandle == "allCards") handleGetCards();
    else if (whatHandle == "favCards" && user) handleGetFavCard(user?._id);
    else if (whatHandle == "myCards") handleGetMyCards();
    else handleGetCards();
  }, []);

  useEffect(() => {
    const filterCards = () => {
      if (cards === undefined) {
        setFilteredCards(null);
      } else if (searchQuery.trim() === "") {
        setFilteredCards(cards);
      } else {
        const filtered = cards?.filter(
          (card) =>
            card.title &&
            card.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCards(filtered || null);
      }
    };

    filterCards();
  }, [cards, searchQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return {
    handleSearch,
    searchQuery,
    setSearchQuery,
    filteredCards,
    setFilteredCards,
  };
};

export default useSearch;
