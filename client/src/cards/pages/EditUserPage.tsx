import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container } from "@mui/material";
import useHandleUsers from "../../users/hooks/useHandleUsers";
import initialSignupForm from "../../users/helpers/initialForms/initialSignupForm";
import userEditSchema from "../../users/models/Joi/userEditSchema";
import useUsertwo, { userType } from "../../cards/hooks/useUser";
import mapUserToModel from "../../cards/helpers/normalizations/mapUserToModel";
import UserFormEdit from "../../users/components/UserFormEdit";

const EditUserPage = () => {
  const { handleGetUser, handleUpdateUser } = useUsertwo();
  const { user } = useUser();
  const { userId } = useParams();
  const { handleSignup } = useHandleUsers();

  const navigate = useNavigate();

  const { value, ...rest } = useForm(
    initialSignupForm,
    userEditSchema,
    handleUpdateUser
  );

  const { data, errors } = value;
  const { handleInputChange, handleReset, onSubmit, setData, validateForm } =
    rest;

  useEffect(() => {
    if (userId)
      handleGetUser(userId).then((userFromServer: any) => {
        if (user?._id !== userFromServer!._id) return navigate(ROUTES.ROOT);
        const modeleduser = mapUserToModel(userFromServer!);
        setData(modeleduser);
      });
  }, []);

  // if (userId) return <Navigate replace to={ROUTES.LOGIN} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserFormEdit
        title="edit user"
        onSubmit={onSubmit}
        onReset={handleReset}
        errors={errors}
        onFormChange={validateForm}
        onInputChange={handleInputChange}
        data={data}
        setData={rest.setData}
      />
    </Container>
  );
};

export default EditUserPage;
