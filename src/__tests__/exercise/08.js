// testing custom hooks
// http://localhost:3000/counter-hook

// import * as React from 'react'
import {renderHook, act} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// function setup({initialProps} = {}) {
//   const result = {}
//   function TestComponent() {
//     result.current = useCounter(initialProps)
//     return null
//   }
//   // 🐨 render the component
//   render(<TestComponent />)
//   return result
// }

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// function useCounterHookExample() {
//   const {count, increment, decrement} = useCounter()
//   return (
//     <div>
//       <div>Current count: {count}</div>
//       <button onClick={decrement}>Decrement</button>
//       <button onClick={increment}>Increment</button>
//     </div>
//   )
// }

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
  // 🐨 get the elements you need using screen
  // const increment = screen.getByRole('button', {name: /increment/i})
  // const decrement = screen.getByRole('button', {name: /decrement/i})
  // const message = screen.getByText(/current count/i)
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  // expect(message).toHaveTextContent('Current count: 0')
  // userEvent.click(increment)
  // expect(message).toHaveTextContent('Current count: 1')
  // userEvent.click(decrement)
  // expect(message).toHaveTextContent('Current count: 0')
})

/* eslint no-unused-vars:0 */
test('allows customization of the initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 3}})
  expect(result.current.count).toBe(3)
  act(() => result.current.increment())
  expect(result.current.count).toBe(4)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 2}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('the step can be changed', () => {
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 3}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})
