import {
  UserMapToModelType,
  UserMapToModelEditType,
} from "../../models/types/userType";

export const normalizeUser = (user: UserMapToModelType) => {
  return {
    // _id: user._id,
    name: {
      first: user.first,
      middle: user.middle,
      last: user.last,
    },
    phone: user.phone,
    email: user.email,
    password: user.password,
    image: {
      url: user.url,
      alt: user.alt,
    },
    address: {
      state: user.state,
      country: user.country,
      city: user.city,
      street: user.street,
      zip: +user.zip,
      houseNumber: +user.houseNumber,
    },
    isBusiness: user.isBusiness,
  };
};

export const normalizeEditUser = (user: UserMapToModelEditType) => {
  return {
    _id: user._id,
    name: {
      first: user.first,
      middle: user.middle,
      last: user.last,
    },
    phone: user.phone,
    email: user.email,
    password: user.password,
    image: {
      url: user.url,
      alt: user.alt,
    },
    address: {
      state: user.state,
      country: user.country,
      city: user.city,
      street: user.street,
      zip: +user.zip,
      houseNumber: +user.houseNumber,
    },
    isBusiness: user.isBusiness,
  };
};
