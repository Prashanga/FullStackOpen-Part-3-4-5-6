import React, { useState, useEffect } from 'react'
import Blog from './components/Blog.js'
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


  const handleLogin = async ({ username,password }) => {
    try
    {

      console.log('logging in with ', username, password)
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem(
        'loggedinUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
      setNotification(`successfully logged in as ${user.username}`)
        setTimeout(() => {setNotification(null)}, 5000)
    }
    catch (exception) {
      setErrorMsg(`Wrong credentials. Try again`)
        setTimeout(() => {setErrorMsg(null)}, 5000)
      console.log(exception)
    }


  }

  const getAndSortBlogs = async () => {
    const returnedBlogs = await blogService.getAll()
    const sortedBlogs = returnedBlogs.sort(function(a, b) {
      return b.likes - a.likes
      })
    setBlogs(sortedBlogs)
  }


  const handleLogOut = () => {
    window.localStorage.removeItem('loggedinUser')
    setUser(null)

  }

  const handleDelete = async (blog) => {
    if(window.confirm(`Remove blog "${blog.title}"?`)){
      try{
        const response = await blogService.deleteOne(blog)
        if(response.status === 204){
          setBlogs(blogs.filter(oneBlog => {return oneBlog.id !== blog.id}))
          setNotification(`successfully deleted ${blog.title}`)
          setTimeout(() => {setNotification(null)}, 5000)
        }
        else{
          getAndSortBlogs()
          setErrorMsg(`Failed to delete`)
          setTimeout(() => {setErrorMsg(null)}, 5000)

        }
        console.log(response)}
        catch(e){
          console.log(e)
          getAndSortBlogs()
          setErrorMsg(`Failed to delete`)
          setTimeout(() => {setErrorMsg(null)}, 5000)
        }
    }

  }

  const handleLike = (id) => {
    console.log("Liked blog: ",id)
  }

  const handleBlogSubmit = async (newBlog) => {
    try{
    const post = await blogService.postOne(newBlog)
    setBlogs(blogs.concat(post))
    setNotification(`successfully added ${post.title}`)
    setTimeout(() => {setNotification(null)}, 5000)
    console.log(post)
  }
  catch(e){
    setErrorMsg(`${e}`)
    setTimeout(() => {setErrorMsg(null)}, 5000)
    console.log(e)
  }
}


  useEffect(() => {
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


  const showBlogs = () => (
    <>
     <p>{user.name} logged in </p>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
    )}

    </>
  )

  const logoutButton = () => (
    <button onClick={handleLogOut} name="logOutButton">Logout</button>
  )


  return (

    <div>
      <Notification className="notification" notificationType="error" message={errorMsg} />
      <Notification className="notification" notificationType="success" message={notification} />

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
