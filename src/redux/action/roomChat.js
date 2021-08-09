import axiosApiIntances from "../../utils/axios";

export const getRoomChat = (userId, data) => {
  return {
    type: "GET_ROOM_CHAT",
    payload: axiosApiIntances.get(`room-chat/${userId}`, data),
  };
};

export const addRoomChat = (roomChat, userId, friendId, data) => {
  return {
    type: "ADD_ROOM_CHAT",
    payload: axiosApiIntances.post(
      `room-chat/?roomChat=${roomChat}&userId=${userId}&friendId=${friendId}`,
      data
    ),
  };
};

export const getOneRoomChat = (room, userId) => {
  return {
    type: "GET_ONE_ROOM_CHAT",
    payload: axiosApiIntances.get(`room-chat/?room=${room}&userId=${userId}`),
  };
};
