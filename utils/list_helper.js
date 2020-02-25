const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesTotal = blogs.reduce((sum,blog) => {
    return sum + blog.likes
  },0)
  console.log(likesTotal)
  return likesTotal
}

const favouriteBlog = (blogs) => {
  let mostLiked = blogs.reduce((most,current) => {
    return current.likes>most.likes?current:most
  },{likes:0})
  console.log(mostLiked)

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  }
}

// const mostBlogs = (blogs) => {
//     let authorsArray = []
//     blogs.forEach(blog => {
//         if(authorsArray.indexOf(blog.author===-1)){
//             authorsArray.push(blog.author)
//         }
//     })
// }

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}