import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import 'firebase/firestore';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  console.log('hello from appContext');

  const [authInitializing, setAuthInitializing] = useState();
  const [user, setUser] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [triviaData, setTriviaData] = useState([]);
  const [id, setId] = useState();
  const [difficulty, setDifficulty] = useState();
  const [token, setToken] = useState();

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

  //OpenDB Token so we do not get the same question twice, sessions are deleted after 6 hours
  useEffect(() => {
    const getToken = async () => {
      Axios.get('https://opentdb.com/api_token.php?command=request').then(
        (res) => {
          if (res.data.response_code === 0) {
            setToken(res.data.token);
          } else {
            Axios.get(
              `https://opentdb.com/api_token.php?command=reset&token=${token}`,
            ).then((response) => {
              setToken(response.data.token);
            });
          }
        },
      );
    };
    getToken();
  }, []);

  const getTriviaData = async (id, difficulty) => {
    Axios.get(
      `https://opentdb.com/api.php?amount=1&encode=base64&category=${id}&difficulty=${difficulty}&token=${token}`,
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
        setAuthInitializing,
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
