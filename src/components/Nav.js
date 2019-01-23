import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

function Nav (props) {
  return (
    <div className='navigation'>

      <ul id='main-menu' className="nav">
        <li className="nav-item">
          <NavLink className="nav-link" to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/add' exact activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/leaderboard' exact activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
      </ul>
      {
        props.authedUser
        ? 
          <ul id='user-menu' className="nav justify-content-end">
            <li className="nav-item">
              <span className="nav-link">
                Hello, {props.name}
              </span>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={ (e) => handleLogout(e, props) }>
                Logout
              </a>
            </li>
          </ul>
        : null
      }
    </div>
  )
}

function handleLogout (e, props) {
  e.preventDefault()
  const { dispatch } = props
  dispatch(setAuthedUser(null))
}

function mapStateToProps ({authedUser, users, questions}) {
  const { name } = authedUser ? users[authedUser] : ''
  return {
    authedUser,
    name,
  }
}

export default connect(mapStateToProps)(Nav)
