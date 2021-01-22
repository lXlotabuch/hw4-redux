import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

// ACTION TYPES
const SET_SHOW_MODAL = "SET_SHOW_MODAL";
const SET_HIDDEN_MODAL = "SET_HIDDEN_MODAL";
const SET_ITEMS = "SET_ITEMS";

const initialState = {
  goods: [],
  modal: {
    goodIdToCart: null,
    showModal: false,
  },
};

// REDUCES

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SHOW_MODAL:
      return {
        ...state,
        modal: {
          goodIdToCart: payload,
          showModal: true,
        },
      };
    case SET_HIDDEN_MODAL:
      return {
        ...state,
        modal: {
          goodIdToCart: null,
          showModal: false,
        },
      };
    case SET_ITEMS:
      return {
        ...state,
        goods: payload,
      };

    default:
      return state;
  }
};

// ACTION CREATORS

export const setShowModal = (payload) => {
  return {
    type: SET_SHOW_MODAL,
    payload,
  };
};

export const setHiddenModal = () => {
  return {
    type: SET_HIDDEN_MODAL,
  };
};

const setGoods = (payload) => {
  return {
    type: SET_ITEMS,
    payload,
  };
};

// MIDDLEWARE

export const getGoods = () => async (dispatch) => {
  const res = await fetch("./DATA.json");
  const data = await res.json();

  dispatch(setGoods(data));
};

// STORE

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
