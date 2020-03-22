import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import searchReducer from '../reducers/searchReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  search: searchReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store