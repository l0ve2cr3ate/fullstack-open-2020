import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import './App.css'
import Button from './components/Button'

import Notification from './components/Notification'

import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    // Using an IIFE to use async function in useEffect
    ;(async function getAll() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])

  // Check if user in localStorage
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    if (!username || username === '' || !password || password === '') {
      setMessage({ error: 'Please fill in username and password' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    }

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user))

      await blogService.setToken(user.token)
      setUser(user)

      // set notification message
      setMessage({
        notification: `${user.name} succesfully logged in`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (err) {
      // set error message
      setMessage({
        error: 'wrong username or password',
      })

      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.error(err)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      // hide form after adding a blog
      blogFormRef.current.toggleVisibility()

      // Check if all required fields are filled in
      if (!blogObject.title || !blogObject.author || !blogObject.url) {
        setMessage({ error: 'Please fill in all the fields' })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        return
      }

      // Add new blog to db
      await blogService.create(blogObject)

      const updatedBlogs = await blogService.getAll()

      // update React state with newly created blog
      setBlogs(updatedBlogs)

      // set notification message
      setMessage({
        notification: `A new blog ${blogObject.title} by ${blogObject.author} added`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (err) {
      // set error message
      setMessage({
        error: `No nooo! ${err}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.error(err)
    }
  }

  const addLike = async (id, blogObject) => {
    try {
      // Add like to blog and store it in db
      await blogService.update(id, blogObject)

      const updatedBlog = {
        ...blogObject,
        id,
      }

      // Update blogs in state
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
    } catch (err) {
      console.error(err)
      setMessage({
        error: `No nooo! ${err}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const blog = blogs.filter((blog) => blog.id === id)

      if (window.confirm(`Remove ${blog[0].title} by ${blog[0].author}`)) {
        // delete blog from db
        await blogService.deleteBlog(id)

        // update state to reflect deletion in UI
        setBlogs(blogs.filter((blog) => blog.id !== id))
      }
    } catch (err) {
      console.error(err)
      setMessage({
        error: `No nooo! ${err}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <main>
      {!user ? (
        <>
          <h1>Login to application</h1>
          <Notification
            type={message?.notification ? 'notification' : 'error'}
            message={
              message?.notification ? message?.notification : message?.error
            }
          />
          <LoginForm handleLogin={handleLogin} />
        </>
      ) : (
        <>
          <h1>Blogs</h1>
          <Notification
            type={message?.notification ? 'notification' : 'error'}
            message={
              message?.notification ? message?.notification : message?.error
            }
          />

          <span className="user">{user?.username} logged in</span>
          <Button onClick={handleLogout} className="logoutBtn" type="button">
            Logout
          </Button>

          <h2>Create New</h2>
          <Togglable btnText="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <div className="blogs">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  user={user}
                  removeBlog={deleteBlog}
                  updateLike={addLike}
                  key={blog.id}
                  blog={blog}
                />
              ))}
          </div>
        </>
      )}
    </main>
  )
}

export default App
