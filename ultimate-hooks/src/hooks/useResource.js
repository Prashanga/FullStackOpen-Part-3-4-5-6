import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
      axios.get(baseUrl)
            .then(res => {
                setResources(res.data)
                console.log(res)
            })
  },[])

  //It is sufficient to implement fetching all resources and creating a new resource.

  const create = (resource) => {
      console.log("create from create",resource)
    return axios.post(baseUrl,resource)
                .then(res => {
                    setResources(resources.concat(resource))
                    return res.data
                })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export default useResource