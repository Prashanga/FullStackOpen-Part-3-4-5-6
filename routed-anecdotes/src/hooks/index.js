import { useState } from 'react'

const useField = ()=> {

    const [ value, setValue ] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
      }

    const resetValue = () => {
        setValue('')
    }

  
    return {
      setValues:{
        value,
        onChange
      },
      resetValues: resetValue
    }

}

 export default useField