const initialState = ''

//vote and create a new anecdote
const notificationReducer = (state=initialState, action) => {
    switch(action.type){
        case 'VOTE_NOTIF':
            return action.message
        case 'ADD_NEW_NOTIF':
            return action.message
       case 'RESET_NOTIF':
            return action.message
        default:
            return initialState
    }
}

export const vote_notification = (message) => {
    return {
      type: 'VOTE_NOTIF',
      message: `You voted ${message}`
    }
}

export const add_new_notification = (message) => {
    return {
      type: 'ADD_NEW_NOTIF',
      message: `Successfully added ${message}`
    }
}

export const reset_notification = () => {
    return {
      type: 'RESET',
      message: ''
    }
}

export default notificationReducer