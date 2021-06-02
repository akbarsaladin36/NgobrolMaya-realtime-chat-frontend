import axiosApiIntances from "../../utils/axios";

export const getRoomChat = (userId) => {
  return {
    type: "GET_ROOM_CHAT",
    payload: axiosApiIntances.get(`room-chat/${userId}`),
  };
};

export const addRoomChat = (data) => {
  return {
    type: "ADD_ROOM_CHAT",
    payload: axiosApiIntances.post("room-chat", data),
  };
};
