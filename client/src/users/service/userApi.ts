import axios from "axios";
import UserInterface from "../../users/models/interfaces/UserInterface";
import UserType, { Login, UserRegistered } from "../models/types/userType";
import { NormalizedEditUser } from "../../cards/models/types/userTypes";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const login = async (user: Login) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/users/login`, user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const signup = async (normalizedUser: UserType) => {
  try {
    const { data } = await axios.post<UserRegistered>(
      `${apiUrl}/users`,
      normalizedUser
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getUser = async (userId: string) => {
  try {
    const { data } = await axios.get<string>(`${apiUrl}/users/${userId}`);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const editUser = async (normalizedUser: NormalizedEditUser) => {
  try {
    const UserToServer = { ...normalizedUser };
    // delete UserToServer._id;
    // console.log(UserToServer);

    const { data } = await axios.put<UserInterface>(
      `${apiUrl}/Users/${normalizedUser._id}`,
      UserToServer
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};
