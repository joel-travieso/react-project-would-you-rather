import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import './App.css';
import Dashboard from './components/Dashboard'
import Leaderboard from './components/Leaderboard'
import QuestionPage from './components/QuestionPage'
import Nav from './components/Nav'
import AddQuestion from './components/AddQuestion'
import Login from './components/Login'
import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <h1>Would You Rather?</h1>
            <Nav />
            {
              this.props.authedUser
              ? null
              : <Login />
            }
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/questions/:id' component={QuestionPage} />
                  <Route path='/add' component={AddQuestion} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route path='/login' exact component={Login} />
                </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser,
  }
}

export default connect(mapStateToProps)(App)