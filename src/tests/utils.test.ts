import { it, expect, describe, vi } from "vitest";
import { formatTime, mapPick, calculateDropdownCoord, getRelativeCoords} from "../utils/utils";

describe("test specific map function", () => {
    it("test timer function", () => {
        const time = formatTime(1)
        expect(time).toBe("00:00:01")

        const time2 = formatTime(7500)
        expect(time2).toBe("02:05:00")
    })

    it("test map pick function", () => {
        const map = mapPick(1)
        expect(map).toBe("../../../public/map_1.png")
    })

})

describe("test coord function", () => {
    const createMockEvent = (
        mouseX: number, 
        mouseY: number, 
        rect: { left: number; top: number; width: number; height: number }
    ) => {
        return {
            clientX: mouseX,
            clientY: mouseY,
            currentTarget: {
                getBoundingClientRect: vi.fn(() => ({
                    left: rect.left,
                    top: rect.top,
                    width: rect.width,
                    height: rect.height,

                    right: rect.left + rect.width,
                    bottom: rect.top + rect.height,
                    x: rect.left,
                    y: rect.top,
                    toJSON: () => {}
                }))
            }
        } as unknown as React.MouseEvent<HTMLImageElement>;
    };

    it('should calculate 0% (top-left) correctly', () => {
        const event = createMockEvent(100, 100, {
            left: 100, top: 100, width: 500, height: 500
        });

        const result = getRelativeCoords(event);

        expect(result.pctX).toBe(0);
        expect(result.pctY).toBe(0);
    });

    it('should calculate 100% (bottom-right) correctly', () => {
        const event = createMockEvent(600, 600, {
            left: 100, top: 100, width: 500, height: 500
        });

        const result = getRelativeCoords(event);

        expect(result.pctX).toBe(100);
        expect(result.pctY).toBe(100);
    });

    it('should calculate 50% (dead center) correctly', () => {
        const event = createMockEvent(150, 100, {
            left: 50, top: 50, width: 200, height: 100
        });

        const result = getRelativeCoords(event);

        expect(result.pctX).toBe(50); 
        expect(result.pctY).toBe(50); 
    });

    it('should handle decimal percentages', () => {
        const event = createMockEvent(125, 125, {
            left: 100, top: 100, width: 100, height: 100
        });

        const result = getRelativeCoords(event);

        expect(result.pctX).toBe(25);
        expect(result.pctY).toBe(25);
    });
})

describe("test coord dropdown function", () => {
    const DROPDOWN_W = 160;
    const DROPDOWN_H = 221;
    
    const MAP_W = 1000;
    const MAP_H = 1000;

    it('should return original coordinates when in the "Safe Zone" (Top-Left)', () => {
        const result = calculateDropdownCoord(100, 100, MAP_W, MAP_H);

        expect(result).toEqual({ xCoord: 100, yCoord: 100 });
    });

    it('should shift X left when clicking the Right Edge (Overflow X)', () => {
        const result = calculateDropdownCoord(900, 100, MAP_W, MAP_H);

        expect(result.xCoord).toBe(900 - DROPDOWN_W);
        expect(result.yCoord).toBe(100); // 
    });

    it('should shift Y up when clicking the Bottom Edge (Overflow Y)', () => {
        const result = calculateDropdownCoord(100, 800, MAP_W, MAP_H);

        expect(result.xCoord).toBe(100);
        expect(result.yCoord).toBe(800 - DROPDOWN_H);
    });

    it('should shift BOTH axes when clicking the Bottom-Right Corner', () => {
        const result = calculateDropdownCoord(900, 800, MAP_W, MAP_H);

        expect(result).toEqual({
            xCoord: 900 - DROPDOWN_W,
            yCoord: 800 - DROPDOWN_H
        });
    });

    it('should NOT shift if exactly on the boundary edge', () => {
        const boundaryX = MAP_W - DROPDOWN_W; 
        
        const result = calculateDropdownCoord(boundaryX, 100, MAP_W, MAP_H);


        expect(result.xCoord).toBe(boundaryX);
    });
})