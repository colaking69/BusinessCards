import AddressInterface from "./AddressInterface";
import NameInterface from "./nameInterface";
import ImageInterface from "../../../cards/models/interfaces/ImageInterface";

interface UserInterface {
  _id: string;
  name: NameInterface;
  phone: string;
  email: string;
  address: AddressInterface;
  password: string;
  image: ImageInterface;
  isBusiness: boolean;
}

export default UserInterface;
