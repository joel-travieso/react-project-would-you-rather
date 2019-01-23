import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class UserItem extends Component {
  render() {
    const { user } = this.props

    if (user === null) {
      return <p>This user does not exist</p>
    }

    const {
      id, answers, questions
    } = user

    return (


      <div class="question-item card bg-light mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-6 col-md-4">
              <User id={id}/>
            </div>
            <div class="col-6 col-md-4">
              <div className='user-item-user'>
                <div className='user-item-asked'>Asked: {questions.length} | Answered: {Object.keys(answers).length}</div>
              </div>
            </div>
            <div class="col-6 col-md-4">
              <div className='user-item-total'><span>Total:</span><h1>{questions.length + Object.keys(answers).length}</h1></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const user = users[id]

  return {
    authedUser,
    user,
  }
}

export default connect(mapStateToProps)(UserItem)
