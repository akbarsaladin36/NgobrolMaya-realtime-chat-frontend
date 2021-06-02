import axiosApiIntances from "../../utils/axios";

export const getAllChat = (roomId) => {
  return {
    type: "GET_ALL_CHAT",
    payload: axiosApiIntances.get(`chat/${roomId}`),
  };
};

export const sendChat = (data) => {
  return {
    type: "SEND_CHAT",
    payload: axiosApiIntances.post("chat", data),
  };
};
