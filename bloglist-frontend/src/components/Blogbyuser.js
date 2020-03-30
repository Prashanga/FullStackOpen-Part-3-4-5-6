import { useSelector } from 'react-redux'
import React from 'react'
import {
    useParams,   useRouteMatch
  } from "react-router-dom"

const Blogbyuser = () => {
    const blogs = useSelector(state => state.blogs)
    const sortedBlogs = blogs.sort(function(a, b) {
        return b.likes - a.likes
        })

    const checkRoute = useRouteMatch('/blog-by-users/:user')
    const user1 = useParams().user
    const user2 = useSelector(state => state.user.name)

    const user = checkRoute?  user1: user2
    
    const blogsByUser = sortedBlogs.filter( blog => blog.author === user)

        return(
            <>
                <h2>{user.username}</h2>
                <h4>added blogs: </h4>
                <ul>
                    {
                        blogsByUser.map( blog => {
                        return <li key={blog.id}>{blog.title}</li>
                        })
                    }
                
                </ul>
            </>
        )


}

export default Blogbyuser