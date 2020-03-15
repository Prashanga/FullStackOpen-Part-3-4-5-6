import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {

    let component

    const blog = {
        title: 'Test blog',
        url: 'www.test.com',
        autohr: 'Prashanga',
        likes: '99'
    }

    beforeEach(() => {
      component = render(
        <Blog blog={blog} />
      )
    })

    test('renders its children', () => {
      expect(
        component.container.querySelector('.blogComponent')
      ).toBeDefined()
    })

    test('at start url and likes are not displayed', () => {
      const div = component.container.querySelector('.toggable')

      expect(div).toHaveStyle('display: none')
    })

    // test('after clicking the button, children are displayed', () => {
    //   const button = component.getByText('show...')
    //   fireEvent.click(button)

    //   const div = component.container.querySelector('.togglableContent')
    //   expect(div).not.toHaveStyle('display: none')
    // })

  })