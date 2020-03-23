import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { vote_notification, reset_notification } from '../reducers/notificationReducer'

const AnectdoteList = (props) => {

    // const anecdotes = useSelector(state => state.anecdotes)
    // const searchFilter = useSelector(state =>state.search)
    const anecdotes = props.anecdotes
    const searchFilter = props.searchFilter
    //const dispatch = useDispatch()

    const vote = (anecdote) => {

      const message = anecdote.content.substr(0,10).concat('...')
      const id = anecdote.id
      
     //dispatch(updateVote({id,anecdotes}))
      props.vote_notification(message)
      //dispatch(vote_notification(message))
      props.updateVote({id,anecdotes})
      //clearTimeout()
     setTimeout(() => {
        props.reset_notification()
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        searchFilter: state.search
    }
}
const mapDispatchToProps = { 
    vote_notification,
    reset_notification,
    updateVote
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnectdoteList)

export default ConnectedAnecdoteList