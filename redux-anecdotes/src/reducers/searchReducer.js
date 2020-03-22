const searchReducer = (state='', action) => {

    switch(action.type){
        case 'SEARCH':
            return action.search
        default:
            return state

    }

}

export const search_update = (search) => {
    return {
      type: 'SEARCH',
      search
    }
}

export default searchReducer