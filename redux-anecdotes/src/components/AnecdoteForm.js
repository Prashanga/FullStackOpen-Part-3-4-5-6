import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../reducers/anecdoteReducer'
import { add_new_notification, reset_notification } from '../reducers/notificationReducer'

const AnectdoteForm = () => {

    const dispatch = useDispatch()

    const addNew = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value

        dispatch(addItem(content))
        event.target.anecdote.value = ''
        dispatch(add_new_notification(content.substr(0,10).concat('...')))

        setTimeout(() => {
          dispatch(reset_notification())
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

export default AnectdoteForm