import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Homepage from '../components/Homepage/Homepage';
describe('testing homepage', () => {
  it("homepage have 3 map displayed", () => {
    render(
    <MemoryRouter>
      <Homepage />
    </MemoryRouter>
  )
    const mapArr = screen.getAllByTestId("map-container")

    expect(mapArr.length).toBe(3)
  })
});