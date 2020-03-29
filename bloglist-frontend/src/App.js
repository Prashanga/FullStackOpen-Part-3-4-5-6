import React, { useState, useEffect } from 'react'
import Blog from './components/Blog.js'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage, setMessageEmpty } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { setUser, resetUser } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()
  const blogs =useSelector(state=>state.blogs) 
  const user =useSelector(state=> state.user)

  // const [blogs, setBlogs] = useState([])
  //const [user,setUser] = useState(null)
  // const [notification,setNotification] = useState(null)
  // const [errorMsg,setErrorMsg] = useState(null)


  const handleLogin = async ({ username,password }) => {
    try
    {
      console.log('logging in with ', username, password)
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem(
        'loggedinUser', JSON.stringify(user)
      )
      dispatch(setUser(user))
      blogService.setToken(user.token)
      console.log(user)

      dispatch(setMessage(`successfully logged in as ${user.username}`,'success'))
        setTimeout(() => {dispatch(setMessageEmpty())}, 5000)
    }
    catch (exception) {
      dispatch(setMessage(`Wrong credentials. Try again`,'error'))
        setTimeout(() => {dispatch(setMessageEmpty())}, 5000)
      console.log(exception)
    }


  }

  const getAndSortBlogs = async () => {
    const returnedBlogs = await blogService.getAll()
    const sortedBlogs = returnedBlogs.sort(function(a, b) {
      return b.likes - a.likes
      })
      //console.log(sortedBlogs)
    dispatch(setBlogs(sortedBlogs))
    
  }


  const handleLogOut = () => {
    window.localStorage.removeItem('loggedinUser')
    dispatch(resetUser())

  }

  const handleDelete = async (blog) => {
    if(window.confirm(`Remove blog "${blog.title}"?`)){
      try{
        const response = await blogService.deleteOne(blog)
        if(response.status === 204){
          dispatch(setBlogs(blogs.filter(oneBlog => {return oneBlog.id !== blog.id})))
          dispatch(setMessage(`successfully deleted ${blog.title}`,'success'))
          setTimeout(() => {dispatch(setMessageEmpty())}, 5000)

          // setNotification(`successfully deleted ${blog.title}`)
          // setTimeout(() => {setNotification(null)}, 5000)
        }
        else{
          getAndSortBlogs()
          dispatch(setMessage(`failed to delete}`,'error'))
          setTimeout(() => {dispatch(setMessageEmpty())}, 5000)

          // setErrorMsg(`Failed to delete`)
          // setTimeout(() => {setErrorMsg(null)}, 5000)

        }
        console.log(response)}
        catch(e){
          console.log(e)
          getAndSortBlogs()
          dispatch(setMessage(`failed to delete}`,'error'))
          setTimeout(() => {dispatch(setMessageEmpty())}, 5000)

          // setErrorMsg(`Failed to delete`)
          // setTimeout(() => {setErrorMsg(null)}, 5000)
        }
    }

  }

  const handleLike = (blog) => {
    console.log("Liked blog: ", blog.id)
    dispatch(setMessage(`successfully liked ${blog.title}`,'success'))
          setTimeout(() => {dispatch(setMessageEmpty())}, 5000)

    // setNotification(`successfully liked ${blog.title}`)
    //     setTimeout(() => {setNotification(null)}, 10000)
  }

  const handleBlogSubmit = async (newBlog) => {
    try{
    const post = await blogService.postOne(newBlog)
    dispatch(setBlogs(blogs.concat(post)))
    dispatch(setMessage(`successfully added ${post.title}`,'success'))
    setTimeout(() => {dispatch(setMessageEmpty())}, 5000)

    // setNotification(`successfully added ${post.title}`)
    // setTimeout(() => {setNotification(null)}, 5000)
    console.log(post)
  }
  catch(e){
    dispatch(setMessage(`${e}`,'error'))
    setTimeout(() => {dispatch(setMessageEmpty())}, 5000)
    
    // setErrorMsg(`${e}`)
    // setTimeout(() => {setErrorMsg(null)}, 5000)
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
      dispatch(setUser(user))
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
      <Notification />
      {/* notificationType="error" message={errorMsg} /> */}
      {/* <Notification className="notification" notificationType="success" message={notification} /> */}

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
