import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import quizCategoriesReducer from 'store/reducers/quizCategories';
import quizesReducer from 'store/reducers/quizes';
import userReducer from 'store/reducers/user';

const rootReducer = combineReducers({
  quizCategories: quizCategoriesReducer,
  quizes: quizesReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
