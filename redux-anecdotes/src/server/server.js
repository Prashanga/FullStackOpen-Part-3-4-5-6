import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}



const createNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const object = { 
        content,
        id: getId(),
        votes: 0 
    }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async ({id,anecdotes}) => {
  
  const quote = anecdotes.find(x=> x.id === id)
  const voteUpdate = {
    ...quote,
    votes: quote.votes+1
  }
  return anecdotes.map(item => item.id===id?voteUpdate:item)


}


export default { getAll, createNew, vote }