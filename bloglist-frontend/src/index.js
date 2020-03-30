import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  BrowserRouter as Router
} from "react-router-dom"


const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer
  })

const store = createStore(reducer, composeWithDevTools())


ReactDOM.render(
  <Router>
    <Provider store={store}>
      
        <App />
  
    </Provider> 
  </Router>,
    document.getElementById('root')
    )