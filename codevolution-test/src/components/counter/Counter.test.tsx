import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Counter } from './Counter'

describe('Counter', () => {
  test('renders correctly', () => {
    render(<Counter />)
    const countEl = screen.getByRole('heading')
    expect(countEl).toBeInTheDocument()

    const incrementButton = screen.getByRole('button', {
      name: 'Increment',
    })
    expect(incrementButton).toBeInTheDocument()
  })

  test('renders a count of 0', () => {
    render(<Counter />)
    const countEl = screen.getByRole('heading')
    expect(countEl).toHaveTextContent('0')
  })

  // test user interaction using user-event testing library
  test('renders a count of 1 after clicking the increment button', async () => {
    user.setup()
    render(<Counter />)
    const incrementButton = screen.getByRole('button', {
      name: 'Increment',
    })
    await user.click(incrementButton)
    const countEl = screen.getByRole('heading')
    expect(countEl).toHaveTextContent('1')
  })

  test('renders a count of 2 after double clicking the increment button', async () => {
    user.setup()
    render(<Counter />)
    const incrementButton = screen.getByRole('button', {
      name: 'Increment',
    })
    await user.click(incrementButton)
    await user.click(incrementButton)
    const countEl = screen.getByRole('heading')
    expect(countEl).toHaveTextContent('2')
  })

  test('rendera count of 10 after clicking the set button', async () => {
    user.setup()
    render(<Counter />)

    const amountInput = screen.getByRole('spinbutton')
    await user.type(amountInput, '10')
    expect(amountInput).toHaveValue(10)
    const setButton = screen.getByRole('button', {
      name: 'Set',
    })
    await user.click(setButton)

    const countEl = screen.getByRole('heading')
    expect(countEl).toHaveTextContent(/^10$/)
  })

  // tab키로 element를 이동하며 focus가 되는지 test
  test('elements are focused  in the right order', async () => {
    user.setup()
    render(<Counter />)
    const amountInput = screen.getByRole('spinbutton')
    const setButton = screen.getByRole('button', {
      name: 'Set',
    })
    const incrementButton = screen.getByRole('button', {
      name: 'Increment',
    })
    await user.tab()
    expect(incrementButton).toHaveFocus()
    await user.tab()
    expect(amountInput).toHaveFocus()
    await user.tab()
    expect(setButton).toHaveFocus()
  })
})
