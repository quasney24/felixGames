import Axios from 'axios';
import base64 from 'react-native-base64';
import { shuffleArray } from './util';

export const getTriviaData = async (catId, diff) => {
  let triviaData;
  await Axios.get('https://opentdb.com/api_token.php?command=request')
    .then(async (res) => {
      if (res.data.response_code === 0) {
        await Axios.get(
          `https://opentdb.com/api.php?amount=10&encode=base64&category=${catId}&difficulty=${diff}&token=${res.data.token}`,
        )
          .then(async (response) => {
            if (response.data.results.length === 10) {
              triviaData = transformAPIData(response.data.results);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return triviaData;
};

const transformAPIData = (data) => {
  const transformedData = { questions: [] };

  // put category and difficulty into own properties
  transformedData.category = base64
    .decode(data[0].category)
    .replace('Entertainment: ', '')
    .replace('Science: ', '');
  transformedData.difficulty = base64.decode(data[0].difficulty);

  data.forEach((q) => {
    //decode data, rename properties for consistencty
    q.question = base64.decode(q.question);
    q.type = base64.decode(q.type);
    const incorrectAnswers = [];
    q.incorrect_answers.forEach((i) => {
      incorrectAnswers.push(base64.decode(i));
    });
    q.incorrectAnswers = incorrectAnswers;
    q.correctAnswer = base64.decode(q.correct_answer);
    delete q.incorrect_answers;
    delete q.correct_answer;

    // delete category and difficulty properties (stored on top level)
    delete q.category;
    delete q.difficulty;

    // create array of answers, shuffle otherwise last answer is always correct
    q.all = q.incorrectAnswers.slice();
    q.all.push(q.correctAnswer);
    shuffleArray(q.all);
    transformedData.questions.push(q);
  });
  return transformedData;
};
