import UserInterface from "../../../users/models/interfaces/UserInterface";

import { UserMapToModelType } from "../../models/types/userTypes";

const mapUserToModel = (user: UserInterface): UserMapToModelType => {
  return {
    _id: user._id,
    first: user.name.first,
    middle: user.name.middle,
    last: user.name.last,
    phone: user.phone,
    email: user.email,
    state: user.address.state!,
    country: user.address.country,
    city: user.address.city,
    street: user.address.street,
    houseNumber: String(user.address.houseNumber!),
    zip: String(user.address.zip!),
    password: user.password,
    url: user.image.url,
    alt: user.image.alt,
    isBusiness: user.isBusiness,
  };
};

export default mapUserToModel;
