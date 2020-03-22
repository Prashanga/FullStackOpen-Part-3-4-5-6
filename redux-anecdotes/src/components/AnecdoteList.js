import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { vote_notification, reset_notification } from '../reducers/notificationReducer'

const AnectdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {

      const message = anecdote.content.substr(0,10).concat('...')
      dispatch(updateVote(anecdote.id))
      
      dispatch(vote_notification(message))

      setTimeout(() => {
        dispatch(reset_notification())
      }, 5000)
    }

    return(
        <div> 
    
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick = {() => vote(anecdote)}>vote</button>
                </div>
                
                </div>
            )}
       
    </div>
    )

}

export default AnectdoteList