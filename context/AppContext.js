import React, { createContext, useState, useEffect } from 'react'
import Axios from 'axios'

export const AppContext = createContext()

export const AppContextProvider = (props) => {
  console.log('hello from appContext')

  const [categoryData, setCategoryData] = useState([])
  const [triviaData, setTriviaData] = useState([])
  const [id, setId] = useState()
  const [difficulty, setDifficulty] = useState()

  // useEffect(() => {
  //   const getAllCategoryData = async() => {
  //     Axios.get('https://opentdb.com/api_category.php').then((response) => {
  //       console.log("respons", response)
  //       // setCategoryData(response.data.trivia_categories)
  //     })
  //   }
  //   getAllCategoryData()
  // }, [])

  const getTriviaData = async (id, difficulty) => {
    Axios.get(`https://opentdb.com/api.php?amount=1&encode=base64&category=${id}&difficulty=${difficulty}`).then((res)=>{
      console.log("from Context", res)
      setId(id)
      setDifficulty(difficulty)
      setTriviaData(res.data.results)
    })
  }

  return(
    <AppContext.Provider value={{getTriviaData, triviaData, id, difficulty}}>
      {props.children}
    </AppContext.Provider>
  )
}