export type AddressType = {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
};

export type UserFromClientType = {
  first: string;
  middle: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  isBusiness: boolean;
};

export type UserMapToModelType = {
  _id: string;
  first: string;
  middle: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  isBusiness: boolean;
};

export type NormalizedEditUser = {
  name: {
    first: "string";
    middle: "string";
    last: "string";
  };
  phone: "string";
  email: "string";
  password: "string";
  image: {
    url: "string";
    alt: "string";
  };
  address: {
    state: "string";
    country: "string";
    city: "string";
    street: "string";
    house: "string";
    zip: "number";
  };
  isBusiness: "string";
};

export type CreateUserErrors = Partial<UserFromClientType>;
