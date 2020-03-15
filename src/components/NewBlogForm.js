import React,{ useState } from 'react'



const NewBlogForm = ({ handleBlogSubmit }) => {

  const [title,setTitle] = useState('')
  const [url,setURL] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()
    handleBlogSubmit({
      title,
      url
    })
    setURL('')
    setTitle('')
  }


  return (


      <form onSubmit={addNewBlog}>

        <h3>Add a new blog</h3>
        <div>
          Title
          <input type="text" className="inputTitle" value={title} name="Title" onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
          Url
          <input type="text" className="inputUrl" name="URL" value={url} onChange= {(e) => setURL(e.target.value)}/>
        </div>
        <p></p>
        <button type="submit">Create</button>

    </form>

)
}
export default NewBlogForm