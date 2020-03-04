import React,{useState} from 'react'


const Blog = ({ blog,handleLike }) => {

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
  <div style={blogStyle}>
    Title: {blog.title} &nbsp;
    <button onClick = {toggleVisibility}>{label}</button>
    
    <div style={{display: visibility?'':'none'}}>
      <br />Url: {blog.url}
      <br />Author: {blog.author}
      <br />Likes: {blog.likes} &nbsp;
      <button onClick={() => handleLike(blog.id)} >Like</button>
    </div>

  </div>
)
}


  export default Blog
