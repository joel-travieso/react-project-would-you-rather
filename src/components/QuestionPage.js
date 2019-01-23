import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import User from './User'

class QuestionPage extends Component {

  handleAnswerOne = (e) => {
    this.handleAnswer(e, 'optionOne')
  }
  handleAnswerTwo = (e) => {
    this.handleAnswer(e, 'optionTwo')
  }

  handleAnswer = (e, answer) => {
    e.preventDefault()

    const { dispatch, question, authedUser } = this.props

    dispatch(handleAnswerQuestion({
      qid: question.id,
      answer,
      authedUser
    }))
  }

  render() {
    const { valid, question, optionOnePercent, optionTwoPercent, answered} = this.props

    if (!valid) {
      return (
      <div className='question-page 404-page'>
        <p>This question does not exist</p>
      </div>
      )
    }

    const {
      optionOne, optionTwo
    } = question

    return (
      <div className="question-page card bg-light mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-6 col-md-4">
              <User id={question.author}/>
            </div>
            <div className="col-12 col-md-8">
              <button className={'btn question-page-option option-one ' + (answered === 'optionOne' ? 'btn-success' : (answered === 'optionTwo' ? 'btn-dark' : 'btn-dark not-answered')) } disabled={answered} onClick={ answered ? null : this.handleAnswerOne}>
                <span className='question-page-option-text'>{optionOne.text}</span>
                <span className='question-page-option-stats'>{optionOne.votes.length} votes ({optionOnePercent}%)</span>
              </button>
              <button className={'btn question-page-option option-two ' + (answered === 'optionTwo' ? 'btn-success' : (answered === 'optionOne' ? 'btn-dark' : 'btn-dark not-answered')) } disabled={answered} onClick={ answered ? null : this.handleAnswerTwo}>
                <span className='question-page-option-text'>{optionTwo.text}</span>
                <span className='question-page-option-stats'>{optionTwo.votes.length} votes ({optionTwoPercent}%)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, props) {
  const { id } = props.match.params
  const question = questions[id]

 return question ? {
    valid: true,
    authedUser,
    question,
    optionOnePercent: Math.round((question.optionOne.votes.length * 100)/(question.optionOne.votes.length + question.optionTwo.votes.length)),
    optionTwoPercent: Math.round((question.optionTwo.votes.length * 100)/(question.optionOne.votes.length + question.optionTwo.votes.length)),
    answered: question.optionOne.votes.indexOf(authedUser) > -1 ? 'optionOne' : (question.optionTwo.votes.indexOf(authedUser) > -1 ? 'optionTwo' : false),
  } : {
    valid: false,
  }
}

export default connect(mapStateToProps)(QuestionPage)
