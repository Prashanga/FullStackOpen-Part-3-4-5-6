import React from 'react'



const NewBlogForm = ({handleBlogSubmit,title,URL,setURL,setTitle}) => (
    <form onSubmit={handleBlogSubmit}>
      <h3>Add a new blog</h3>
    <div> 
      Title
      <input type="text" value={title} name="Title" onChange={setTitle}/>
    </div>
    <div>
      Url
      <input type="text" name="URL" value={URL} onChange= {setURL}/>
    </div>
    <p></p>
    <button type="submit">Submit</button>      
  </form> 
)

export default NewBlogForm