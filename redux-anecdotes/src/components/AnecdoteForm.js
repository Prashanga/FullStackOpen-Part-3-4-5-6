import React from 'react'
import { connect } from 'react-redux'
//import { useDispatch } from 'react-redux'
import { addItem } from '../reducers/anecdoteReducer'
import { add_new_notification, reset_notification } from '../reducers/notificationReducer'

const AnectdoteForm = (props) => {

    //const dispatch = useDispatch()

    const addNew = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value

        //dispatch(addItem(content))
        props.addItem(content)
        event.target.anecdote.value = ''
        props.add_new_notification(content.substr(0,10).concat('...'))

        setTimeout(() => {
          props.reset_notification()
        }, 5000)
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

const mapDispatchToProps = { 
  add_new_notification,
  reset_notification,
  addItem,
  }

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnectdoteForm)

export default ConnectedAnecdoteForm