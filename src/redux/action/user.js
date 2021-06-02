import axiosApiIntances from "../../utils/axios";

export const getAllUserProfile = (data) => {
  return {
    type: "GET_PROFILE_ALL",
    payload: axiosApiIntances.get("auth/profile", data),
  };
};

export const getUserProfileId = (id) => {
  return {
    type: "GET_PROFILE_ID",
    payload: axiosApiIntances.get(`auth/profile/${id}`),
  };
};

export const updateUserProfileId = (id, data) => {
  return {
    type: "UPDATE_PROFILE_ID",
    payload: axiosApiIntances.patch(`auth/profile/${id}`, data),
  };
};
