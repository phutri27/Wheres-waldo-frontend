import { it, expect, describe } from "vitest";
import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from "react-router";
import userEvent from "@testing-library/user-event";

import MapSquare from "../components/Homepage/MapSquare";
import SpecificMap from "../components/Map/SpecificMap";

describe("testing individual square", () => {
    it("confirm square element is fully implemented", () => {        
        render(
        <MemoryRouter>
            <MapSquare imgUrl="example/img" altText="example image" map_id={1}/>
        </MemoryRouter>
    )

        const link = screen.getByRole("link", {name: /play/i})
        const scoreboardBtn = screen.getByRole('button', {name: "Scoreboard"})

        expect(link).toBeInTheDocument()
        expect(scoreboardBtn).toBeInTheDocument()
    })

    it("navigate to the right routes when click Link", async () => {
        const user = userEvent.setup()
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<MapSquare imgUrl="test.jpg" altText="test_img" map_id={1}/>} />
                    <Route path="/1" element={<SpecificMap />} />
                </Routes>
            </MemoryRouter>
        )

        const button = screen.getByRole('link', {name: /play/i})
        await user.click(button)

        expect(screen.getByTestId("counter")).toBeInTheDocument()
    })

    it("display scoreboard", async () => {
        const user = userEvent.setup()
        render(
            <MemoryRouter>
                <MapSquare imgUrl="test.jpg" altText="test_img" map_id={1}/>
            </MemoryRouter>
        )

        const button = screen.getByRole('button', {name: /scoreboard/i})
        await user.click(button)

        expect(screen.getByTestId("scoreboard-container")).toBeInTheDocument()
    })
})