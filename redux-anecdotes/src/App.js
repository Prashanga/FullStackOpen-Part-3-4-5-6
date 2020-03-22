import React, { useEffect } from 'react'
import AnectdoteForm from './components/AnecdoteForm'
import AnectdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'
import dbService from './server/server'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dbService.getAll()
      .then(anecdotes => dispatch(initAnecdotes(anecdotes)))
  },[])

  return (
    <>
      <Notification />
      <br />
      <Filter />
      <h2>Anecdotes</h2>
      
      <br />
      <AnectdoteList />
      <br />
      <AnectdoteForm />
    </>
  )
}

export default App