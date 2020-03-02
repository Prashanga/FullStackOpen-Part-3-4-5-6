import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)


  const handleLogin = async (event) => {
    event.preventDefault()
    try
    {

      console.log('logging in with ', username, password)
      const user = await loginService.login({username, password,})
      window.localStorage.setItem(
        'loggedinUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    }
    catch (exception) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      console.log(exception)
    }


  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedinUser')
    setUser(null)

  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //check if a logged in info is present already
  useEffect(() => {
    const userInLocal = localStorage.getItem('loggedinUser')
    if(userInLocal){
      setUser(userInLocal)
      console.log("Setting user from hook -----> ",userInLocal)
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      
      <div> 
        Username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        Password
        <input type="password" name="Password" value={password} onChange= {(event)=>setPassword(event.target.value) }/>
      </div>
      <button type="submit">login</button>      
    </form>
  )

  const showBlogs = () =>(
    <>
    <h2>Blogs</h2>
    <p>{user.name} logged in </p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    
    </> 
  )

  const logoutButton = () =>(
    <button onClick={handleLogOut} name="logOutButton">Logout</button>
  )

  return (
  
    <div>
      {user === null && loginForm() }
      
      {user !== null && showBlogs()} 
      <p></p>   
      {user !== null && logoutButton()}  
    </div>
  )
}

export default App