import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'

const AnectdoteList = () => {

    const anecdotes = useSelector(state => state)
    const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()
  
    const vote = (id) => {
      console.log('vote', id)
      dispatch(updateVote(id))
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
                    <button onClick = {() => vote(anecdote.id)}>vote</button>
                </div>
                
                </div>
            )}
            
    </div>
    )

}

export default AnectdoteList

