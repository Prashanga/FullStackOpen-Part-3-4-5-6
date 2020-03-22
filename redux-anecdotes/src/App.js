import React from 'react'
import AnectdoteForm from './components/AnecdoteForm'
import AnectdoteList from './components/AnecdoteList'
import Notification from './components/Notification'


const App = () => {
  
  return (
    <>
      <Notification />
      <h2>Anecdotes</h2>
      <AnectdoteForm />
      <br />
      <AnectdoteList />
    </>
  )
}

export default App