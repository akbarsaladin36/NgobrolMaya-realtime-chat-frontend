import axiosApiIntances from "../../utils/axios";

export const getAllChat = (roomChat) => {
  return {
    type: "GET_ALL_CHAT",
    payload: axiosApiIntances.get(`chat/${roomChat}`),
  };
};

export const sendChat = (data) => {
  return {
    type: "SEND_CHAT",
    payload: axiosApiIntances.post("chat", data),
  };
};
