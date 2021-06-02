import axiosApiIntances from "../../utils/axios";

export const getAllContact = (userId) => {
  return {
    type: "GET_ALL_CONTACT",
    payload: axiosApiIntances.get(`contact/${userId}`),
  };
};

export const addFriendContact = (data) => {
  return {
    type: "ADD_FRIEND_CONTACT",
    payload: axiosApiIntances.post("contact", data),
  };
};
