import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {

    let component

    const blog = {
        title: 'Test blog',
        url: 'www.test.com',
        author: 'Prashanga',
        likes: '99'
    }

    const mockLikeHandler =jest.fn()

    beforeEach(() => {
      component = render(
        <Blog blog={blog} handleLike={mockLikeHandler} />
      )
    })

    test('renders its children', () => {
      expect(
        component.container.querySelector('.blogComponent')
      ).toBeDefined()
    })

    test('at start url and likes are not displayed', () => {
      const div = component.container.querySelector('.togglable')

      expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {

      const button = component.getByText('View')
      fireEvent.click(button)

      const div = component.container.querySelector('.togglable')
      expect(div).not.toHaveStyle('display: none')
    })

    test('like button is pressed twice', () => {
        const button = component.getByText('Like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockLikeHandler.mock.calls.length).toBe(2)
    })

  })