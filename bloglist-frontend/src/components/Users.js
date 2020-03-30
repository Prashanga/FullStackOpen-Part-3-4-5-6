import { useSelector } from 'react-redux'
import React from 'react'
import {
    Link
  } from "react-router-dom"


const Users = () => {
    
    const blogs = useSelector(state => state.blogs)

    const users = [...new Set(blogs.map(blog => blog.author))]

    console.log("users from Usrrs ",blogs)

    return(
        <>
            <h1>Users</h1>
            <table>
                <thead>
                <tr>
                    <th>   </th>
                    <th>blogs created</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(user => 
                        <tr key={user}>
                            <td><Link to={`/blog-by-users/${user}`}>{user}</Link></td>
                            <td>{blogs.filter(blog => blog.author === user).length}</td>
                        </tr>
                        
                    )
                }
                </tbody>
            </table>
        
        </>
    )
}

export default Users