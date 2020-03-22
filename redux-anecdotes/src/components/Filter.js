import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import searchReducer, { search_update }  from '../reducers/searchReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    
    dispatch(search_update(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter