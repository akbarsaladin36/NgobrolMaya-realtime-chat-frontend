const initialState = {
  dataAllUserProfile: [],
  dataUserProfile: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE_ALL_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "GET_PROFILE_ALL_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataAllUserProfile: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_PROFILE_ALL_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataAllUserProfile: [],
        msg: action.payload.response.data.msg,
      };
    case "GET_PROFILE_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "GET_PROFILE_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataUserProfile: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_PROFILE_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataUserProfile: {},
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_PROFILE_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "UPDATE_PROFILE_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_PROFILE_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_PROFILE_IMAGE_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "UPDATE_PROFILE_IMAGE_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_PROFILE_IMAGE_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "DELETE_PROFILE_IMAGE_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "DELETE_PROFILE_IMAGE_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "DELETE_PROFILE_IMAGE_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default user;
