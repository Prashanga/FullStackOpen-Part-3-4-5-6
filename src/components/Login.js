import React,{useState} from 'react'

const Login = ({handleLogin}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitLogin = (event) =>{
        event.preventDefault()
        const user = ({
            username,
            password
        })
        handleLogin(user)
        setUsername('')
        setPassword('')
    }

    

    return (
    <form onSubmit={submitLogin}>
        
        <div> 
        Username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
        Password
        <input type="password" name="Password" value={password} onChange= {(event)=>setPassword(event.target.value) }/>
        </div>
        <button type="submit">Login</button>      
    </form>
    )
}

export default Login