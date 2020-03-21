import React from 'react'
import AnectdoteForm from './components/AnecdoteForm'
import AnectdoteList from './components/AnecdoteList'


const App = () => {
  

  return (
    <>
      <h2>Anecdotes</h2>
      <AnectdoteForm />
      <br />
      <AnectdoteList />
    </>
  )
}

export default App