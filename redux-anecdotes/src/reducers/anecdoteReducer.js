import dbService from '../server/server'

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE':
      //const id = action.data.id
      // const quote = state.find(x=> x.id === id)
      // const voteUpdate = {
      //   ...quote,
      //   votes: quote.votes+1
      // }
      return action.data

      case 'ADD':
        return [...state,action.data]

      case 'INIT_ANECDOTES':
        return action.data


    default:
      return state
  }
}

export const updateVote = (id) => {

  return async dispatch => {
    const data = await dbService.vote(id)
    dispatch({
      type: 'VOTE',
      data
    })
    
  }

}

export const addItem = (content) => {
  
  return async dispatch => {
    const data = await dbService.createNew(content)
    dispatch({
      type: 'ADD',
      data
    })
    
  }
}

export const initAnecdotes = () => {

  return async dispatch => {
    const data = await dbService.getAll()
    dispatch({
    type: 'INIT_ANECDOTES',
    data
    })
  }
}

export default anecdoteReducer