import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { createComment } from '../reducers/blogReducer'
import InputField from './InputField'
import Button from './Button'
import styles from './CommentForm.module.css'

const CommentForm = () => {
  const [inputValue, setInputValue] = useState(null)

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

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

  const addComment = async (event) => {
    event.preventDefault()
    try {
      const title = inputValue?.comment

      const comment = {
        title,
      }

      const blogId = blog.id

      dispatch(createComment(blogId, comment))

      // reset input value
      setInputValue({ comment: '' })
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <form onSubmit={addComment}>
      <div className={styles.flex}>
        <InputField
          label="Comment"
          htmlFor="comment"
          type="text"
          name="comment"
          value={inputValue?.comment || ''}
          onChange={handleInputChange}
        />
        <Button className={styles.submitBtn} type="submit">
          Add comment
        </Button>
      </div>
    </form>
  )
}

export default CommentForm
