import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
//import filterReducer from './reducers/filterReducer'

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })

// const store = createStore(
//   reducer,
//   composeWithDevTools())


const store = createStore(anecdoteReducer)

export default store