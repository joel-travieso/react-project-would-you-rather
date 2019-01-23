import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionItem from './QuestionItem'

class Dashboard extends Component {
  state = {
    section: 'unanswered',
  }

  handleSwitch = (e, section) => {
    e.preventDefault()
    this.setState(() => ({
      section: section
    }))
  }

  render() {
    const { section } = this.state
    return (
      <div>
        <h3>Dashboard</h3>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={'nav-link ' + ((section ===  'unanswered') ? 'active' : '')} href="#" onClick={ (e) => this.handleSwitch(e, 'unanswered') }>Unanswered</a>
          </li>
          <li className="nav-item">
            <a className={'nav-link ' + ((section ===  'answered') ? 'active' : '')} href="#" onClick={ (e) => this.handleSwitch(e, 'answered') }>Answered</a>
          </li>
        </ul>
        <ul className='dashboard-list'>
          {
            section === 'unanswered'
            ? this.props.items.filter((item) => (
                  item.optionOne.votes.concat(item.optionTwo.votes).indexOf(this.props.authedUser) === -1
                )).map((item) => (
                <li key={item.id}>
                  <QuestionItem id={item.id}/>
                </li>
              ))
            : this.props.items.filter((item) => (
                  item.optionOne.votes.concat(item.optionTwo.votes).indexOf(this.props.authedUser) > -1
                )).map((item) => (
                <li key={item.id}>
                  <QuestionItem id={item.id}/>
                </li>
              ))
        }
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions }) {
  return {
    items: Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp).map(function(key) {
      return questions[key];
    }),
    authedUser,
  }
}

export default connect(mapStateToProps)(Dashboard)