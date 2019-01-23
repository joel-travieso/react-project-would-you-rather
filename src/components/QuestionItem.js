import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import User from './User'

class QuestionItem extends Component {
  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This question does not exist</p>
    }

    const {
      author, id, optionOne, optionTwo
    } = question

    return (
      <div className="question-item card bg-light mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-6 col-md-4">
              <User id={author}/>
            </div>
            <div className="col-12 col-md-8">
              <div className='question-item-question'>
                <em>Would You Rather...?</em>
                <div className='question-item-option'>{optionOne.text}</div>
                <em> - OR - </em>
                <div className='question-item-option'>{optionTwo.text}</div>
              </div>
              <Link to={`/questions/${id}`} className='question-link btn btn-primary btn-sm'>See Details</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question,
  }
}

export default withRouter(connect(mapStateToProps)(QuestionItem))
