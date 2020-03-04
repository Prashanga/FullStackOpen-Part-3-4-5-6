import React from 'react'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 4,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2
  }


  return (
  <div style={blogStyle}>
    Title: {blog.title}<br />URL: {blog.url}
    <br />Author: {blog.author}
  </div>
)
  }

export default Blog
