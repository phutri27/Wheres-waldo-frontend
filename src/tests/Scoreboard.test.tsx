import { it, expect, describe, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import ScoreResult from "../components/Scoreboard/ScoreResult";
import AddScore from "../components/Scoreboard/AddScore";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

describe("Test ScoreResult component", () => {
    it("Test ScoreResult component to render", () => {
        const { container } = render(
        <MemoryRouter>
            <ScoreResult setActive={() => {}} type="in-game" map_id={1} resetGame={() => {}}/>
        </MemoryRouter>
    )
        expect(container).toBeInTheDocument()
    })

    it("Test ScoreResult resetGame function", async() => {
        const user = userEvent.setup()
        const resetGameMock = vi.fn()
        const resetBackToAddMock = vi.fn()
        render(
            <MemoryRouter>
                <ScoreResult setActive={resetBackToAddMock} type="in-game" map_id={1} resetGame={resetGameMock}/>
            </MemoryRouter>
        )
        screen.debug()
        const button = screen.getByRole('button', {name: /restart game/i})
        await user.click(button)

        expect(resetGameMock).toHaveBeenCalled()
        expect(resetBackToAddMock).toHaveBeenCalled()
    })

    it("Test AddScore component", async() => {
        const user = userEvent.setup()
        render(<AddScore map_id={1} counter={100} setActive={() => {}} /> )

        const input = screen.getByRole('textbox', {name: /username/i})
        expect(input).toBeInTheDocument()

        await user.type(input, "lets go")

        expect(input).toHaveValue("lets go")
    })
})