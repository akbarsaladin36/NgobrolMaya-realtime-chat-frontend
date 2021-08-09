import axiosApiIntances from "../../utils/axios";

export const getAllContact = (userId) => {
  return {
    type: "GET_ALL_CONTACT",
    payload: axiosApiIntances.get(`contact/${userId}`),
  };
};

export const addFriendContact = (userId, friendId, data) => {
  return {
    type: "ADD_FRIEND_CONTACT",
    payload: axiosApiIntances.post(
      `contact/${userId}?friendId=${friendId}`,
      data
    ),
  };
};

export const getOneContact = (userId, friendId) => {
  return {
    type: "GET_ONE_CONTACT",
    payload: axiosApiIntances.get(
      `contact/?userId=${userId}&friendId=${friendId}`
    ),
  };
};
