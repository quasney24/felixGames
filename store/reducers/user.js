const SET_USER = 'SET_USER';
const SET_AUTH_LOADING = 'SET_AUTH_LOADING';
const UPDATE_USER_FRIENDS = 'UPDATE_USER_FRIENDS';

const INITIAL_STATE = {
  user: null,
  authInitializing: false,
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        authInitializing: false,
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        authInitializing: action.authInitializing,
      };
    case UPDATE_USER_FRIENDS:
      return {
        ...state,
        user: {
          ...state.user,
          friends: action.friends,
        },
      };
    default:
      return state;
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function setAuthInitializing(authInitializing) {
  return {
    type: SET_AUTH_LOADING,
    authInitializing,
  };
}

export function updateUserFriends(friends) {
  return {
    type: UPDATE_USER_FRIENDS,
    friends,
  };
}
