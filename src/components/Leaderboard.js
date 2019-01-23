import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserItem from './UserItem'

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <h3>Leaderboard</h3>
        <ul className='leaderboard-list'>
            {this.props.items.map((item) => (
            <li key={item.id}>
              <UserItem id={item.id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  return {
    items: Object.keys(users).sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)).map(function(key) {
      return users[key];
    }),
    authedUser,
  }
}

export default connect(mapStateToProps)(Leaderboard)