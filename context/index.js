import React, { createContext, useState } from 'react';
import Axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  console.log('hello from appContext');

  const [authInitializing, setAuthInitializing] = useState(false);
  const [user, setUser] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [triviaData, setTriviaData] = useState([]);
  const [id, setId] = useState();
  const [difficulty, setDifficulty] = useState();

  const getAllCategoryData = async () => {
    Axios.get('https://opentdb.com/api_category.php').then(async (response) => {
      const transformedCatagories = [];
      response.data.trivia_categories.forEach((cat) => {
        cat.name = cat.name.replace('Entertainment: ', '');
        cat.name = cat.name.replace('Science: ', '');
        transformedCatagories.push(cat);
      });
      setCategoryData(transformedCatagories);
    });
  };

  const getTriviaData = async (id, difficulty) => {
    Axios.get(
      `https://opentdb.com/api.php?amount=1&encode=base64&category=${id}&difficulty=${difficulty}`,
    ).then((res) => {
      console.log('from Context', res);
      setId(id);
      setDifficulty(difficulty);
      setTriviaData(res.data.results);
    });
  };

  return (
    <AppContext.Provider
      value={{
        authInitializing,
        user,
        setUser,
        getAllCategoryData,
        categoryData,
        getTriviaData,
        triviaData,
        id,
        difficulty,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
