import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class AddQuestion extends Component {
  state = {
    textOne: '',
    textTwo: '',
    toHome: false,
  }
  handleChangeOne = (e) => {
    const text = e.target.value

    this.setState(() => ({
      textOne: text
    }))
  }
  handleChangeTwo = (e) => {
    const text = e.target.value

    this.setState(() => ({
      textTwo: text
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { textOne, textTwo } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(textOne, textTwo))

    this.setState(() => ({
      textOne: '',
      textTwo: '',
      toHome: true,
    }))
  }
  render() {
    const { textOne, textTwo, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3>Create question</h3>
        <form className='add-question' onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" placeholder="Option 1" value={textOne} onChange={this.handleChangeOne}/>
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Option 2" value={textTwo} onChange={this.handleChangeTwo}/>
            </div>
            <button className='btn btn-primary' type='submit' disabled={textOne === '' || textTwo === ''}>
                Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect()(AddQuestion)