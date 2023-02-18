import { render, screen } from '@testing-library/react'
import { Greet } from './greet'

describe('Greet', () => {
  test('renders correctly', () => {
    render(<Greet />)
    const textEl = screen.getByText(/hello/i)
    expect(textEl).toBeInTheDocument()
  })
})

describe('Nested', () => {
  test('renders with a name', () => {
    render(<Greet name="Vishwas" />)
    const textEl = screen.getByText(/hello Vishwas/i)
    expect(textEl).toBeInTheDocument()
  })
})
