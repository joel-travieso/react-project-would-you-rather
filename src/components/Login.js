import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  handleLogin = (e, id) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(id))
  }

  render() {
    return (
      <div className="login-box">
        <div className="card text-center">
          <div className="card-header">
            <h3>Login as...</h3>
          </div>
          <div className="card-body">
            <div className="row">
                {this.props.items.map((item) => (
                <div className="col-6 col-md-4" key={item.id} >
                  <a href="#" onClick={ (e) => this.handleLogin(e, item.id) }>
                    <User id={item.id} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  return {
    items: Object.keys(users).sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)).map(function(key) {
      return users[key];
    }),
  }
}

export default connect(mapStateToProps)(Login)