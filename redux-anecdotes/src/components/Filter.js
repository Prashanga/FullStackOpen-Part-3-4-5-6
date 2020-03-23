import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { search_update }  from '../reducers/searchReducer'

const Filter = (props) => {
  //const dispatch = useDispatch()

  const handleChange = (event) => {
    
    //dispatch(search_update(event.target.value))
    props.search_update(event.target.value)
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

const mapDispatchToProps = { 
  search_update,
  }

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)


export default ConnectedFilter