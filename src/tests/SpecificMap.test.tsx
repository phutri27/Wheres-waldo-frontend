import { it, expect, describe } from "vitest";
import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import SpecificMap from "../components/Map/SpecificMap";
import { formatTime, mapPick } from "../components/Map/utils";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";

describe("test specfic map dom ", () => {
    it("test image responsive", async () => {
        const user = userEvent.setup()
        render(
        <MemoryRouter initialEntries={["/map-1"]}>
            <Routes>
                <Route path="/:map_id" element={<SpecificMap />} />
            </Routes>
        </MemoryRouter>
        )
        const img = screen.getByAltText("map-1")
        await user.click(img)

        expect(screen.getByTestId("answer-container")).toBeInTheDocument()
    })
})


describe("test specific map function", () => {
    it("test timer function", () => {
        const time = formatTime(1)
        expect(time).toBe("00:00:01")
    })

    it("test map pick function", () => {
        const map = mapPick("map_1")
        expect(map).toBe("../../../public/map_1.png")
    })
})
