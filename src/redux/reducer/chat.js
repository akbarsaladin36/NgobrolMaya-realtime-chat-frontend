const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const chatMessage = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_CHAT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ALL_CHAT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_ALL_CHAT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      };
    case "SEND_CHAT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "SEND_CHAT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "SEND_CHAT_REJECTED":
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

export default chatMessage;
