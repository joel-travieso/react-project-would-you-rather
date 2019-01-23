import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {
  render() {
    const { user } = this.props

    if (user === null) {
      return <p>This user does not exist</p>
    }

    const {
      name, avatarURL
    } = user

    return (
      <div className='user'>
        <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar' />
        <div className='user-name'>
          {name}
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

export default connect(mapStateToProps)(User)
