const timerReducer = (state=[], action)=> {
    switch(action.type){
        case 'ADD_TIMER':
            return [...state,action.id]
        case 'REMOVE_TIMER':
            return state.filter(timer => timer !== action.id)
        default:
            return state
    }
}

export const addTimer = (id) => {
    return {
        type: 'ADD_TIMER',
        id
      }
}

export const removeTimer = (id) => {
    return {
        type: 'REMOVE_TIMER',
        id
      }
}


export default timerReducer 