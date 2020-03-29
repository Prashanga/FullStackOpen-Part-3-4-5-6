const notificationReducer = (state = {message:null, type:null}, action) => {
    switch(action.type){
        case 'SET_MESSAGE':
            return { message:action.message, type:action.goal }
        case 'SET_EMPTY':
            return {message:action.message, type:action.goal }
        default:
            return state

    }
}

export const setMessage = (message,goal) => {
    return {
        type: 'SET_MESSAGE',
        message,
        goal
    }
}

export const setMessageEmpty = () => {
    return {
        type: 'SET_EMPTY',
        message: null,
        goal: null
    }
}


export default notificationReducer