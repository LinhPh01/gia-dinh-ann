import { atom, selector } from "recoil";
import { getUserInfo } from "zmp-sdk";

// export const userState = selector({
//   key: "user",
//   get: () =>
//     getUserInfo({
//       avatarType: "normal",
//     }),
// });

export const idState = atom({
  key: "id",
  default: "",
});

export const displayNameState = atom({
  key: "displayName",
  default: "",
});

export const ageState = atom({
  key: "age",
  default: "",
});

export const emailState = atom({
  key: "email",
  default: "",
});

export const locationState = atom({
  key: "location",
  default: "",
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});
export const TokenState = atom({
  key: "TokenState",
  default: "",
});

export const genderState = atom({
  key: "gender",
  default: "",
});

export const allergyState = atom({
  key: "allergy",
  default: "",
});

export const underlyingdiseaseState = atom({
  key: "underlyingdisease",
  default: "",
});

export const totalPointState = atom({
  key: "totalPointState",
  default: 0,
});

export const ranksState = atom({
  key: "ranksState",
  default: [],
});

export const phoneNumberState = atom({
  key: "phone",
  default: "",
});

export const getListInvertState = atom({
  key: "getListInvertState",
  default: "",
});
