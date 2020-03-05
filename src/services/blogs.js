import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const postOne = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  let response = await axios.post(baseUrl,blog,config)

  return response.data

}

const deleteOne = async (blog) => {

  let response = await axios.delete(baseUrl,{ data:blog,headers: { "Authorization": token } })

  return response

}


export default { getAll,setToken,postOne,deleteOne }