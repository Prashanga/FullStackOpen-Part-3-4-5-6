import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

    const message = useSelector(state => state.notification.message)
    const type= useSelector(state => state.notification.type)

    if(message === null){
        return null
    }

    return(
    <div className={type}>
        {message}
    </div>
    )

}


export default Notification