import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'
import Button from './Button'

const BlogForm = ({ createBlog }) => {
  const [inputValue, setInputValue] = useState(null)

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    setInputValue((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      }
    })
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    try {
      const title = inputValue?.title
      const author = inputValue?.author
      const url = inputValue?.url
      const likes = 0

      const blog = {
        title,
        author,
        url,
        likes,
      }

      createBlog(blog)

      // reset input values
      setInputValue({ author: '', title: '', url: '' })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <InputField
        type="text"
        name="title"
        label="title"
        htmlFor="title"
        value={inputValue?.title || ''}
        onChange={handleInputChange}
      />
      <InputField
        type="text"
        name="author"
        label="author"
        htmlFor="author"
        value={inputValue?.author || ''}
        onChange={handleInputChange}
      />
      <InputField
        type="text"
        name="url"
        label="url"
        htmlFor="url"
        value={inputValue?.url || ''}
        onChange={handleInputChange}
      />
      <Button className="createBtn" type="submit">
        Create
      </Button>
    </form>
  )
}

export default BlogForm

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
