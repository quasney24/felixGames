import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import 'firebase/firestore';
import { transformAPIData } from 'functions/quiz';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  console.log('hello from appContext');

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

  //OpenDB Token so we do not get the same question twice, sessions are deleted after 6 hours
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

  useEffect(() => {
    getToken();
  }, []);

  const getTriviaData = async (catId, diff) => {
    setCategoryId(catId);
    setDifficulty(diff);
    await Axios.get(
      `https://opentdb.com/api.php?amount=10&encode=base64&category=${catId}&difficulty=${diff}&token=${token}`,
    )
      .then(async (res) => {
        if (res.data.response_code === 1) {
          // not enough questions, need to think how to handle?
          // seems to happen on celeb category on hard
        }
        if (res.data.response_code === 4) {
          await getToken();
          return getTriviaData(catId, diff);
        }
        if (res.data.results.length === 10) {
          setTriviaData(transformAPIData(res.data.results));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AppContext.Provider
      value={{
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
