import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUser } from "../../../users/providers/UserProvider";
import CardDeleteDialog from "./CardDeleteDialog";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import { addFavCard, removeFavCard } from "../../services/cardApiService";

type CardActionBarProps = {
  likes: string[];
  cardId: string;
  cardUserId: string;
  onDelete: (id: string) => void;
  onLike: () => void;
};

const CardActionBar = ({
  likes,
  cardId,
  cardUserId,
  onDelete,
  onLike,
}: CardActionBarProps) => {
  const [isDialogOpen, setDialog] = useState(false);
  const { user } = useUser();
  const [hasUserLiked, setHasUserLiked] = useState(
    user && likes?.includes(user?._id)
  );
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user && likes?.includes(user?._id)) {
  //     setHasUserLiked(true);
  //   } else {
  //     setHasUserLiked(false);
  //   }
  // }, [user, likes, cardUserId]);

  const handleDialog = (term?: string) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };

  const handleDeleteCard = () => {
    handleDialog();
    onDelete(cardId);
  };

  const addOrRemove = async () => {
    let resultsOfLike = false;
    if (user) {
      if (hasUserLiked) {
        resultsOfLike = await removeFavCard(cardId, user?._id);
      } else {
        resultsOfLike = await addFavCard(cardId, user?._id);
      }
      resultsOfLike && setHasUserLiked(!hasUserLiked);
      onLike();
    }
  };

  return (
    <>
      <CardActions
        disableSpacing
        sx={{ pt: 0, justifyContent: "space-between" }}
      >
        <Box>
          {user && (user._id === cardUserId || user.isAdmin) && (
            <IconButton
              aria-label="delete card"
              onClick={() => handleDialog("open")}
            >
              <DeleteIcon />
            </IconButton>
          )}

          {user?._id === cardUserId && (
            <IconButton
              aria-label="edit card"
              onClick={() => navigate(`${ROUTES.EDIT_CARD}/${cardId}`)}
            >
              <EditIcon />
            </IconButton>
          )}
        </Box>

        <Box>
          <IconButton aria-label="call business">
            <CallIcon />
          </IconButton>

          {user && (
            <IconButton aria-label="add to fav" onClick={addOrRemove}>
              {hasUserLiked ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteIcon />
              )}
            </IconButton>
          )}
        </Box>
      </CardActions>
      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        onDelete={handleDeleteCard}
      />
    </>
  );
};

export default React.memo(CardActionBar);
