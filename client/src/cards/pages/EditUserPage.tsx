import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCreateCardObject";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container } from "@mui/material";
import mapCardToModel from "../helpers/normalizations/mapCardToModel";
import CardForm from "../components/CardForm";
import cardEditSchema from "../models/Joi/cardEditSchema";
import useHandleUsers from "../../users/hooks/useHandleUsers";
import initialSignupForm from "../../users/helpers/initialForms/initialSignupForm";
import signupSchema from "../../users/models/Joi/signupSchema";
import UserForm from "../../users/components/UserForm";

const EditUserPage = () => {
  const { user } = useUser();
  const { handleSignup } = useHandleUsers();
  const { value, ...rest } = useForm(
    initialSignupForm,
    signupSchema,
    handleSignup
  );

  if (user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserForm
        title="register user"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleInputChange}
        data={value.data}
        errors={value.errors}
        setData={rest.setData}
      />
    </Container>
  );
};

export default EditUserPage;
