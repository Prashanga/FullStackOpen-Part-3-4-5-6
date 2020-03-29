import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

test('<NoteBlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <NewBlogForm handleBlogSubmit={createBlog} />
  )

  const title = component.container.querySelector('.inputTitle')
  const url = component.container.querySelector('.inputUrl')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Title from test' }
  })

  fireEvent.change(url, {
    target: { value: 'Url from test' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Title from test' )
  expect(createBlog.mock.calls[0][0].url).toBe('Url from test' )
})