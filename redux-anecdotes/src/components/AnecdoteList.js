import React from 'react'
import { connect } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { vote_notification, reset_notification } from '../reducers/notificationReducer'
import { addTimer, removeTimer } from '../reducers/timerReducer'

const AnectdoteList = (props) => {

    const anecdotes = props.anecdotes
    const searchFilter = props.searchFilter

    const clearAllTimeouts = () => {
        props.timer.forEach(
            time => {
                clearTimeout(time)
                props.removeTimer(time)
            })
    }

    const vote = (anecdote) => {

      const message = anecdote.content.substr(0,10).concat('...')
      const id = anecdote.id
      props.vote_notification(message)
      props.updateVote({id,anecdotes})

        
     if(props.timer.length>0) {clearAllTimeouts()}
     //push timer to redux store
     let timeout = setTimeout(() => {
        props.reset_notification()
      }, 5000)
      
    props.addTimer(timeout)
      
      
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
        searchFilter: state.search,
        timer: state.timer
    }
}
const mapDispatchToProps = { 
    vote_notification,
    reset_notification,
    updateVote,
    addTimer,
    removeTimer
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnectdoteList)

export default ConnectedAnecdoteList