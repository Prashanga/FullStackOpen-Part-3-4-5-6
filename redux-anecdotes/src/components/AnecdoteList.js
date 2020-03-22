import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { vote_notification, reset_notification } from '../reducers/notificationReducer'

const AnectdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const searchFilter = useSelector(state =>state.search)
    const dispatch = useDispatch()


    const vote = (anecdote) => {

      const message = anecdote.content.substr(0,10).concat('...')
      dispatch(updateVote(anecdote.id))

      dispatch(vote_notification(message))

      setTimeout(() => {
        dispatch(reset_notification())
      }, 5000)
    }

    const AllAnecdotes = ()=>{

        const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)

        return(
            <>
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
       
            </>
        )
        
    }

    const FilteredOnlyAnecdotes = () => {
        const filteredAnecdotes = anecdotes.filter(item => {
            return item.content.toLowerCase().search(searchFilter.toLowerCase()) !== -1
    
        })

        const sortedNFiltered = filteredAnecdotes.sort((a,b) => b.votes - a.votes)

        return(
            <>
                {sortedNFiltered.map(anecdote =>
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
       
            </>
        )

    }

    return(
       <> {searchFilter.length<1?<AllAnecdotes />:<FilteredOnlyAnecdotes />}</>
    )

}

export default AnectdoteList