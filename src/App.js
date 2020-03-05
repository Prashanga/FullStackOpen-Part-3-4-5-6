import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Login from './components/Login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [notification,setNotification] = useState(null)
  const [errorMsg,setErrorMsg] = useState(null)


  const handleLogin = async ({username,password}) => {
    try
    {

      console.log('logging in with ', username, password)
      const user = await loginService.login({username, password,})
      window.localStorage.setItem(
        'loggedinUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
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

  const handleLike = (id) => {
    console.log("Liked blog: ",id)
  }

  const handleBlogSubmit = async (newBlog) => {
    
    try{
      
    const post = await blogService.postOne(newBlog)
    setBlogs(blogs.concat(post))
    setNotification(`successfully added ${post.title}`);
    setTimeout(() => {setNotification(null)}, 5000)
    console.log(post)
  }
  catch(e){
    setErrorMsg(`${e}`);
    setTimeout(() => {setErrorMsg(null)}, 5000)
    console.log(e)
  }
}


  useEffect(() => {
    const getAndSortBlogs = async () => {
      const returnedBlogs = await blogService.getAll()
      const sortedBlogs = returnedBlogs.sort(function(a, b) {
        return a.likes - b.likes;
        });
        
      setBlogs(sortedBlogs)

    }

    getAndSortBlogs()
    
  }, [])

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

 
  const showBlogs = () =>(
    <>
     <p>{user.name} logged in </p>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} handleLike={handleLike} />
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

      {user === null && 
      <Togglable buttonLabel="Login">
      <Login 
        handleLogin={handleLogin}
      />
    </Togglable>}
      
      {user !== null && showBlogs()} 
      <p></p>   
      {user !== null && logoutButton()}  
      <p></p>
      {user !== null && 
      <Togglable buttonLabel="New Blog">
        <NewBlogForm 
          handleBlogSubmit={handleBlogSubmit}
        />
      </Togglable>}

    </div>
  )
}

export default App

//To-Do: handleLike on Blog.js