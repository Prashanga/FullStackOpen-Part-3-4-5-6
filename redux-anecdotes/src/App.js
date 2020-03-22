import React from 'react'
import AnectdoteForm from './components/AnecdoteForm'
import AnectdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  
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