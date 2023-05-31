import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import useSearch from "../../../../cards/hooks/useSearch";

const SearchBar = () => {
  // const { searchQuery, handleSearch } = useSearch();

  return (
    // <Box display="inline-flex">
    //   <FormControl variant="standard">
    //     <OutlinedInput
    //       sx={{ backgroundColor: "#e3f2fd" }}
    //       placeholder="Search"
    //       size="small"
    //       value={searchQuery}
    //       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //         handleSearch(e);
    //         console.log(e.target.value);
    //       }}
    //       endAdornment={
    //         <InputAdornment position="end">
    //           <IconButton edge="end">
    //             <SearchIcon />
    //           </IconButton>
    //         </InputAdornment>
    //       }
    //     />
    //   </FormControl>
    // </Box>
    <></>
  );
};

export default SearchBar;
