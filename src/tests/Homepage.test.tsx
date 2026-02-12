import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Homepage from '../components/Homepage/Homepage';
import userEvent from '@testing-library/user-event';

describe('testing homepage', () => {
  it("homepage have 3 map displayed", async() => {
    const user = userEvent.setup()
    render(
    <MemoryRouter>
      <Homepage />
    </MemoryRouter>
  )
    const mapArr = screen.getAllByTestId("map-container")

    expect(mapArr.length).toBe(3)

    const instructionBtn = screen.getByRole('button', {name: /instruction/i})

    await user.click(instructionBtn)

    expect(screen.getByRole('heading', {name: /how to play/i})).toBeInTheDocument()
  })
});