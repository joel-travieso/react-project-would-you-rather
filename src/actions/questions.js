import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

function addQuestion (Question) {
  return {
    type: ADD_QUESTION,
    question: Question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return _saveQuestion({
      author: authedUser,
      optionOneText, 
      optionTwoText
    })
      .then((Question) => dispatch(addQuestion(Question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function answerQuestion ({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer
  }
}

export function handleAnswerQuestion (info) {
  return (dispatch) => {
    return _saveQuestionAnswer(info)
      .then(dispatch(answerQuestion(info)))
      .catch((e) => {
        console.warn('Error in handleanswerQuestion: ', e)
        alert('The was an error answering. Try again.')
      })
  }
}