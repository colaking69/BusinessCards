import { useCallback, useState, useMemo } from "react";
import { normalizeEditUser } from "../../users/helpers/normalization/normalizeUser";
import RegistrationForm, {
  UserMapToModelEditType,
} from "../../users/models/types/userType";
import { editUser } from "../../users/service/userApi";
import { getUser } from "../../users/service/userApi";
import {
  UserMapToModelType,
  NormalizedEditUser,
} from "../../cards/models/types/userTypes";
import { useNavigate } from "react-router-dom";
import { useSnack } from "../../providers/SnackbarProvider";
import ROUTES from "../../routes/routesModel";

export type userType = null | RegistrationForm | undefined | string;
type ErrorType = null | string;

const useUsertwo = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [user, setuser] = useState<userType>(null);

  const navigate = useNavigate();
  const snack = useSnack();

  const requestStatus = (
    loading: boolean,
    errorMessage: ErrorType,
    user: userType
  ) => {
    setLoading(loading);
    setError(errorMessage);
    setuser(user);
  };

  const handleGetUser = async (userId: string) => {
    try {
      setLoading(true);
      const user = await getUser(userId);
      requestStatus(false, null, user);
      return user;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null);
    }
  };

  const handleUpdateUser = useCallback(
    async (userFromClient: UserMapToModelEditType) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeEditUser(userFromClient);
        const userFomServer = await editUser(normalizedUser);
        requestStatus(false, null, userFomServer);
        snack("success", "The user has been successfully updated");
        // navigate(ROUTES.MY_CARDS);
      } catch (error) {
        if (typeof error === "string") return requestStatus(false, error, null);
      }
    },
    []
  );

  return { handleGetUser, handleUpdateUser };
};

export default useUsertwo;
