// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const total = blogs.reduce((total, currentValue) => {
    return total + currentValue.likes
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }
  // Get blog with most likes
  const max = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current,
  )

  // Return most liked blog, with only title, author and likes as properties
  const favBlog = {
    title: max.title,
    author: max.author,
    likes: max.likes,
  }

  return favBlog
}

const mostBlogs = (blogs) => {
  // Get all blog authors
  const authors = blogs.map((blog) => blog.author)

  if (!authors || authors.length === 0) {
    return null
  }

  // Count blogs by author
  const countBlogsByAuthor = authors.reduce((acc, curr) => {
    acc[curr] ? acc[curr]++ : (acc[curr] = 1)

    return acc
  }, {})

  // Return array with name of author with most blogs and amount of blogs.
  const authorWithMostBlogsArray = Object.entries(
    countBlogsByAuthor,
  ).reduce((a, b) => (countBlogsByAuthor[a] > countBlogsByAuthor[b] ? a : b))

  const authorWithMostBlogs = {
    author: authorWithMostBlogsArray[0],
    blogs: authorWithMostBlogsArray[1],
  }

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // Get all of the blog authors
  const authors = blogs.map((blog) => blog.author)

  // filter out doubles
  let uniqueAuthors = [...new Set(authors)]

  const likesByAuthor = uniqueAuthors.map((author) => {
    // Get the blogs for each author
    const blogsByAuthor = blogs.filter((blog) => blog.author === author)

    // Count the total amount of likes by author
    const countLikesPerAuthor = blogsByAuthor.reduce(
      (accumulator, currentValue) => accumulator + currentValue.likes,
      0,
    )

    // Create an object to return author + total amount of it's likes.
    const amountOfLikesByAuthor = {
      author: author,
      likes: countLikesPerAuthor,
    }

    return amountOfLikesByAuthor
  })
  // Return data of author with the most likes
  return likesByAuthor.reduce((a, b) => (a.likes > b.likes ? a : b))
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
