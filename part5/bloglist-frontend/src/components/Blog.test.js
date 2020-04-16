import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM, fireEvent } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  beforeEach(() => {
    component = render(
      <Blog
        user={user}
        removeBlog={mockHandlerRemove}
        updateLike={mockHandlerUpdate}
        blog={blog}
      />,
    )
  })
  const blog = {
    author: 'Just me',
    title: 'Blog title',
    url: 'http://blog-title.com',
    likes: 0,
  }

  const user = {
    username: 'jane',
    name: 'Jane Doe',
  }

  const mockHandlerUpdate = jest.fn()
  const mockHandlerRemove = jest.fn()

  test('renders blog title and author, but not url and number of likes by default', () => {
    const defaultBlogContent = component.container.querySelector('.blog')
    const defaultHiddenContent = component.getByTestId('hidden-content')

    expect(component.container).toHaveTextContent(blog.title)
    expect(defaultBlogContent).not.toHaveStyle('display: none')
    expect(defaultBlogContent).toBeVisible()
    expect(defaultHiddenContent).toHaveClass('hide')
  })

  test('renders blog url and number of likes when view button is clicked', () => {
    const button = component.getByText('View')

    fireEvent.click(button)

    const revealedContent = component.getByTestId('hidden-content')
    const likes = component.container.querySelector('.likes')

    expect(revealedContent).not.toHaveStyle('display: none')
    expect(revealedContent).not.toHaveClass('hide')
    expect(revealedContent).toBeVisible()
    expect(component.container).toHaveTextContent('Likes')
    expect(likes).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.url)
  })

  test('clicking the like button twice calls event handler passed as a prop twice', () => {
    const button = component.getByText('Like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
  })
})
