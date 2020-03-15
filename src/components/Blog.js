import React,{ useState } from 'react'


const Blog = ({ blog,handleLike,handleDelete }) => {

  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }
  const label = visibility?'Hide':'View'

  const blogStyle = {
    paddingTop: 4,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2
  }

  return (
  <div style={blogStyle} className="blogComponent">
    Title: {blog.title} <br />
    Author: {blog.author} <br />
    <button onClick = {toggleVisibility}>{label}</button>

    <div style={ { display: visibility?'':'none' } } className="toggable">
      <br />Url: {blog.url}
      <br />Likes: {blog.likes} &nbsp;
      <button onClick={() => handleLike(blog.id)} >Like</button>
      <br /><button onClick={() => handleDelete(blog)} style={{ color:'blue' }} >Delete</button>
    </div>

  </div>
)
}


  export default Blog
