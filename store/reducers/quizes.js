import * as firebase from 'firebase';
import 'firebase/firestore';

export const FETCH_QUIZES = 'FETCH_QUIZES';
export const FETCH_STATUS = 'FETCH_STATUS';
export const SAVE_QUIZ = 'SAVE_QUIZ';

const INITIAL_STATE = {
  quizes: [],
  isFetching: false,
};

export default function quizesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_QUIZES:
      return {
        ...state,
        quizes: action.quizes,
      };
    case FETCH_STATUS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case SAVE_QUIZ:
      return {
        ...state,
        quizes: [action.quiz, ...state.quizes],
      };
    default:
      return { ...state };
  }
}

export const fetchQuizes = () => {
  return async (dispatch, getState) => {
    const { user } = getState();
    dispatch({ type: FETCH_STATUS, isFetching: true });
    firebase
      .firestore()
      .collection('quizResults')
      .where('uid', '==', user.user.uid)
      .orderBy('completed', 'desc')
      .get()
      .then((querySnapshot) => {
        const quizes = [];
        querySnapshot.forEach((documentSnapshot) => {
          quizes.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        dispatch({ type: FETCH_QUIZES, quizes: quizes });
      });
    dispatch({ type: FETCH_STATUS, isFetching: false });
  };
};

export const saveQuiz = (results) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection('quizResults')
      .add(results)
      .then((response) => {
        dispatch({
          type: FETCH_QUIZES,
          quiz: { id: response._documentPath._parts[1], quiz: results },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
