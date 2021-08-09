import axiosApiIntances from "../../utils/axios";

export const getAllUserProfile = (keywords, data) => {
  return {
    type: "GET_PROFILE_ALL",
    payload: axiosApiIntances.get(`users/profile?keywords=${keywords}`, data),
  };
};

export const getUserProfileId = (id) => {
  return {
    type: "GET_PROFILE_ID",
    payload: axiosApiIntances.get(`users/profile/${id}`),
  };
};

export const updateUserProfileId = (id, data) => {
  return {
    type: "UPDATE_PROFILE_ID",
    payload: axiosApiIntances.patch(`users/profile/${id}`, data),
  };
};

export const updateUserImageProfileId = (id, data) => {
  return {
    type: "UPDATE_PROFILE_IMAGE_ID",
    payload: axiosApiIntances.patch(`users/profile/image/${id}`, data),
  };
};

export const deleteUserImageProfileId = (id) => {
  return {
    type: "DELETE_PROFILE_IMAGE_ID",
    payload: axiosApiIntances.patch(`users/profile/image-delete/${id}`),
  };
};
