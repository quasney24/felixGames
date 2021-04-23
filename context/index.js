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
  const [categoryId, setCategoryId] = useState();
  const [difficulty, setDifficulty] = useState();
  const [token, setToken] = useState();

  const getAllCategoryData = async () => {
    await Axios.get('https://opentdb.com/api_category.php').then(
      async (response) => {
        const transformedCatagories = [];
        response.data.trivia_categories.forEach((cat) => {
          cat.name = cat.name.replace('Entertainment: ', '');
          cat.name = cat.name.replace('Science: ', '');
          transformedCatagories.push(cat);
        });
        setCategoryData(transformedCatagories);
      },
    );
  };

  const getToken = async () => {
    if (token) {
      await Axios.get(
        `https://opentdb.com/api_token.php?command=reset&token=${token}`,
      ).then((response) => {
        setToken(response.data.token);
      });
    } else {
      await Axios.get('https://opentdb.com/api_token.php?command=request').then(
        async (res) => {
          if (res.data.response_code === 0) {
            setToken(res.data.token);
          }
        },
      );
    }
  };

  //OpenDB Token so we do not get the same question twice, sessions are deleted after 6 hours
  useEffect(() => {
    getToken();
  }, []);

  const getTriviaData = async (catId, diff) => {
    console.log(token);
    await Axios.get(
      `https://opentdb.com/api.php?amount=10&encode=base64&category=${catId}&difficulty=${diff}&token=${token}`,
    )
      .then(async (res) => {
        setCategoryId(catId);
        setDifficulty(difficulty);
        if (res.data.response_code === 1) {
          // not enough questions, need to think how to handle?
          // seems to happen on celeb category on hard
        }
        if (res.data.response_code === 4) {
          await getToken();
          return getTriviaData(catId, diff);
        }
        setTriviaData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
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
        categoryId,
        difficulty,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
