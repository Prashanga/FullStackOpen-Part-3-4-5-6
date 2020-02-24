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

module.exports = {
  dummy,
  totalLikes
}