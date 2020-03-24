import React from 'react'
import { connect } from 'react-redux'
import { addTimer, removeTimer } from '../reducers/timerReducer'
import { addItem } from '../reducers/anecdoteReducer'
import { add_new_notification, reset_notification } from '../reducers/notificationReducer'

const AnectdoteForm = (props) => {

  const clearAllTimeouts = () => {
    props.timer.forEach(
        time => {
            clearTimeout(time)
            props.removeTimer(time)
        })
    }

    const addNew = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.addItem(content)
        event.target.anecdote.value = ''
        props.add_new_notification(content.substr(0,10).concat('...'))

       if(props.timer.length>0) {clearAllTimeouts()}
       let timeout = setTimeout(() => {
        props.reset_notification()
      }, 5000)

       props.addTimer(timeout)
    }


      return(
        <>
            <h2>create new</h2>
            <form onSubmit={addNew}>
            <input name="anecdote" /> 
            <button type="submit">create</button>
            </form>
        </>
      )

}

const matchStateToProps = (state) => {
  return {
    timer: state.timer
  }
}
const mapDispatchToProps = { 
  add_new_notification,
  reset_notification,
  addItem,
  addTimer, 
  removeTimer
  }


const ConnectedAnecdoteForm = connect(
  matchStateToProps,
  mapDispatchToProps
)(AnectdoteForm)

export default ConnectedAnecdoteForm