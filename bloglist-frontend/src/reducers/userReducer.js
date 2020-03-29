const userReducer = (state=null, action) => {
    switch(action.type){
        case 'SET_USER':
            return action.user
        case 'RESET_USER':
            return action.user
        default:
            return state
    }
}

export const setUser = (user) => {
    return{
        type:'SET_USER',
        user
    }
}

export const resetUser = () => {
    return{
        type:'RESET_USER',
        user: null
    }
}

export default userReducer