// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

// clean up before each of the test
beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)

  const root = createRoot(div)
  act(() => root.render(<Counter />))
  // console.log(document.body.innerHTML)
  const [decrement, increment] = div.querySelectorAll('button')
  const message = div.firstChild.querySelector('div')
  // console.log(message.textContent)

  expect(message.textContent).toBe('Current count: 0')

  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true /*required for event delegation*/,
    cancelable: true,
    button: 0,
  })
  act(() => increment.dispatchEvent(incrementClickEvent))
  // console.log(document.body.innerHTML)

  //assert
  expect(message.textContent).toBe('Current count: 1')

  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true /*required for event delegation*/,
    cancelable: true,
    button: 0,
  })
  act(() => decrement.dispatchEvent(decrementClickEvent))
  expect(message.textContent).toBe('Current count: 0')

  // 🐨 create a div to render your component to (💰 document.createElement)
  //
  // 🐨 append the div to document.body (💰 document.body.append)
  //
  // 🐨 use createRoot to render the <Counter /> to the div
  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  //
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  // 🐨 click the increment button (💰 act(() => increment.click()))
  // 🐨 assert the message.textContent
  // 🐨 click the decrement button (💰 act(() => decrement.click()))
  // 🐨 assert the message.textContent
  //
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
})

/* eslint no-unused-vars:0 */
