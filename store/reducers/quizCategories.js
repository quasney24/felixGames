import Axios from 'axios';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_STATUS = 'FETCH_STATUS';

const INITIAL_STATE = {
  categories: [],
  isFetching: false,
};

export default function quizCategoriesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case FETCH_STATUS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return { ...state };
  }
}

export const fetchQuizCategories = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_STATUS, isFetching: true });
    await Axios.get('https://opentdb.com/api_category.php').then(
      async (response) => {
        const transformedCatagories = [];
        response.data.trivia_categories.forEach((cat) => {
          cat.name = cat.name.replace('Entertainment: ', '');
          cat.name = cat.name.replace('Science: ', '');
          transformedCatagories.push(cat);
        });
        dispatch({ type: FETCH_CATEGORIES, categories: transformedCatagories });
      },
    );
    dispatch({ type: FETCH_STATUS, isFetching: false });
  };
};
