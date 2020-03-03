import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [title,setTitle] = useState('')
  const [url,setURL] = useState('')
  const [notification,setNotification] = useState(null)
  const [errorMsg,setErrorMsg] = useState(null)


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
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      console.log(user)
      setNotification(`successfully logged in as ${user.username}`);
        setTimeout(() => {setNotification(null)}, 5000)
    }
    catch (exception) {
      setErrorMsg(`Wrong credentials. Try again`);
        setTimeout(() => {setErrorMsg(null)}, 5000)
      console.log(exception)
    }


  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedinUser')
    setUser(null)

  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    try{
    const newBlog = {
        title,
        url
    }
    const post = await blogService.postOne(newBlog)

    setBlogs(blogs.concat(post))

    setNotification(`successfully added ${post.title}`);
    setTimeout(() => {setNotification(null)}, 5000)
    console.log(post)
  }catch(e){
    setErrorMsg(`${e}`);
    setTimeout(() => {setErrorMsg(null)}, 5000)
    console.log(e)
  }
}


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  //check if a logged in info is present already
  useEffect(() => {
    const userInLocal = localStorage.getItem('loggedinUser')
    if(userInLocal){
      const user = JSON.parse(userInLocal)
      setUser(user)
      blogService.setToken(user.token)
      //console.log("Setting user from hook -----> ",user.token)
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
      <Notification notificationType="error" message={errorMsg} />
      <Notification notificationType="success" message={notification} />

      {user === null && loginForm() }
      
      {user !== null && showBlogs()} 
      <p></p>   
      {user !== null && logoutButton()}  
      <p></p>
      {user !== null && 
        <NewBlogForm 
          handleBlogSubmit={handleBlogSubmit}
          url={url}
          title={title}
          setURL={(event) => setURL(event.target.value)}
          setTitle={(event) => setTitle(event.target.value)}
        />}

    </div>
  )
}

export default App