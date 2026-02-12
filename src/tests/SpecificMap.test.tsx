import { it, expect, describe, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import SpecificMap from "../components/Map/SpecificMap";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import CharacterList from "../components/Map/CharacterList";
import Homepage from "../components/Homepage/Homepage";

describe("test specfic map dom ", () => {
    const character = {
        name: "Wendy",
        imgUrl: "example.jpg"
    }

    it("test image responsive", async () => {
        const user = userEvent.setup()
        
        render(
        <MemoryRouter initialEntries={["/1"]}>
            <Routes>
                <Route path="/:map_id" element={<SpecificMap />} />
            </Routes>
        </MemoryRouter>
        )
        const img = screen.getByAltText("map_1")
        await user.click(img)

        expect(screen.getByTestId("answer-container")).toBeInTheDocument()
    })

    it("test CharacterList component from Map", async() => {
        const user = userEvent.setup()
        const onClickFn = vi.fn()
        const cb = vi.fn()
        render(<CharacterList styleCharacter="bg-red-500" callback={cb} character={character} onClick={onClickFn}/>)

        await user.click(screen.getByTestId("character-container"))
        expect(onClickFn).toHaveBeenCalled()
        expect(cb).toHaveBeenCalled()
    })

    it("test Header Component", async () => {
        const user = userEvent.setup()
        render(
            <MemoryRouter initialEntries={["/1"]}>
                <Routes>
                    <Route path="/1" element={<SpecificMap />} />
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </MemoryRouter>
        )
        
        const link = screen.getByRole('link')
        await user.click(link)
        expect(screen.getByTestId("overall-container")).toBeInTheDocument()
    })


})


