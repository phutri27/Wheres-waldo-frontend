import { it, expect, describe, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { useHandleData } from "../hooks/useHandleData";
import { usePostData } from "../hooks/usePostData";
import SpecificMap from "../components/Map/SpecificMap";
import { fireEvent } from "@testing-library/react";
import AddScore from "../components/Scoreboard/AddScore";
import userEvent from "@testing-library/user-event";
import ScoreResult from "../components/Scoreboard/ScoreResult";
import type { ReactElement } from "react";
import { useState } from "react";
import { useGetData } from "../hooks/useGetData";

vi.mock("../hooks/useGetData")
vi.mock("../hooks/useHandleData")
vi.mock("../hooks/usePostData")
vi.mock("../hooks/useGameTimer" , () => ({ useGameTimer: () => 0 }))

vi.mock('react-router', () => ({
  useParams: () => ({ map_id: '1' }),
  // Tự chế một component Link giả:
  Link: ({ to, children }: {to: string, children: ReactElement}) => <a href={to}>{children}</a> 
}));

describe("test hooks", () => {
    it("test useHandleData hooks and SpecificMap and Marker component", async () => {
        const mockFetchApiData = vi.fn().mockResolvedValue({
            found: true,
            message: "You found Waldo"
        });

        (useHandleData as(any)).mockReturnValue({
            fetchApiData: mockFetchApiData,
            setError: () => {},
            error: null
        });

        render(<SpecificMap />)

        const map = screen.getByAltText('map_1')
        fireEvent.click(map, {
            nativeEvent: { offsetX: 500, offsetY: 300 },
            currentTarget: { offsetWidth: 1000, offsetHeight: 1000 }
        })

        const waldoOpt = screen.getAllByAltText("Waldo")
        expect(waldoOpt[1]).toBeInTheDocument()
        fireEvent.click(waldoOpt[1])
        expect(mockFetchApiData).toHaveBeenCalled()

        await waitFor(() => {
            const marker = screen.getByAltText("Waldo marker")
            expect(marker).toBeInTheDocument()
        })

        expect(screen.getByText("You found Waldo")).toBeInTheDocument()
    })

    it("test usePostData hooks and AddScore component", async () => {
        const mockFetchApiData = vi.fn().mockResolvedValue({
            message: "Add to scoreboard succesfully"
        });

        (usePostData as any).mockReturnValue({
            fetchApiData: mockFetchApiData,
            error: null
        });
        const user = userEvent.setup()
        const mockActive = vi.fn()
        render(<AddScore setActive={mockActive} map_id={1} counter={200} />)

        const input = screen.getByRole('textbox', {name: /username/i})
        const submitBtn = screen.getByRole('button', {name: /submit/i})
        await user.type(input, "Obama")
        await user.click(submitBtn)

        expect(mockActive).toHaveBeenCalled()
    })

    it("test return value", async () => {
        const mockData = [{username: "phu", score: 200}];
        
        (useGetData as any).mockImplementation(() => {
            const [isLoading, setIsLoading] = useState<boolean>(true)

            const fetchApiData = async() => {
                await new Promise(resolve => setTimeout(resolve, 100))
                setIsLoading(false)
                return mockData
            }

            return {
                isLoading,
                fetchApiData
            }
        }) 

        render(
            <ScoreResult map_id={1} resetGame={() => {}} type="in-game" />
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
        expect(screen.queryByText("phu")).not.toBeInTheDocument();
        
        waitFor(() => 
            expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
        )

        const name = await screen.findByText("phu")
        expect(name).toBeInTheDocument()
    })

    it("test error display", async () => {
        const mockFetchData = vi.fn().mockResolvedValue([
            {name: "phu", score: 200}
        ]);

        (useGetData as any).mockReturnValue({
            error: "Fetch error",
            fetchApiData: mockFetchData
        });

        render(
            <ScoreResult setActive={() => {}}  map_id={1} resetGame={() => {}} type="in-game" />
        );
        screen.debug()
        const errorText = screen.getByText(/fetch error/i)
        expect(errorText).toBeInTheDocument()
    })
})
