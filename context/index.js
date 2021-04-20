<<<<<<< HEAD
import React, { createContext, useState, useEffect } from 'react';
=======
import React, { createContext, useState } from 'react';
>>>>>>> 7e43237a332f938e20b60b35788e32d5d526708a
import Axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  console.log('hello from appContext');

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
<<<<<<< HEAD
    <AppContext.Provider value={{ getTriviaData, triviaData, id, difficulty }}>
=======
    <AppContext.Provider
      value={{
        getAllCategoryData,
        categoryData,
        getTriviaData,
        triviaData,
        id,
        difficulty,
      }}>
>>>>>>> 7e43237a332f938e20b60b35788e32d5d526708a
      {props.children}
    </AppContext.Provider>
  );
};
