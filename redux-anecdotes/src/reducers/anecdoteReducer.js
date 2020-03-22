const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      const quote = state.find(x=> x.id === id)
      const voteUpdate = {
        ...quote,
        votes: quote.votes+1
      }
      return state.map(item => item.id===id?voteUpdate:item)

      case 'ADD':
        return [...state,action.data]

      case 'INIT_ANECDOTES':
        return action.data


    default:
      return state
  }
}

export const updateVote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const addItem = (data) => {
  return {
    type: 'ADD',
    data
  }
}

export const initAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default anecdoteReducer