import { describe, it, expect } from "vitest";
import { generateSchedule } from "../src/services/scheduleService";

describe("Bài 2 - generateSchedule", () => {

    // TEST 1
    it("Tạo đúng số buổi học", () => {
        const result = generateSchedule({
            startDate: "2026-04-01",
            totalClasses: 5,
            classWeekdays: [1, 3],
            holidays: [],
            holidayRanges: []
        });

        expect(result.fullSchedule).toHaveLength(5);
    });


    // TEST 2
    it("Nếu startDate là ngày học thì phải được tính", () => {
        const result = generateSchedule({
            startDate: "2026-04-02",
            totalClasses: 1,
            classWeekdays: [3],
            holidays: [],
            holidayRanges: []
        });

        expect(result.fullSchedule[0]).toBe("2026-04-02");
    });


    // TEST 3
    it("Không đưa ngày nghỉ vào lịch", () => {
        const result = generateSchedule({
            startDate: "2026-04-01",
            totalClasses: 5,
            classWeekdays: [1, 3],
            holidays: ["2026-04-02"],
            holidayRanges: []
        });

        expect(result.fullSchedule).not.toContain("2026-04-02");
    });


    // TEST 4
    it("Không đưa ngày nằm trong holidayRanges vào lịch", () => {
        const result = generateSchedule({
            startDate: "2026-04-01",
            totalClasses: 5,
            classWeekdays: [1, 3],
            holidays: [],
            holidayRanges: [
                ["2026-04-06", "2026-04-09"]
            ]
        });

        expect(result.fullSchedule).not.toContain("2026-04-07");
        expect(result.fullSchedule).not.toContain("2026-04-09");
    });


    // TEST 5
    it("Loại bỏ ngày học bị trùng trong classWeekdays", () => {
        const result = generateSchedule({
            startDate: "2026-04-01",
            totalClasses: 5,
            classWeekdays: [1, 3, 3, 1],
            holidays: [],
            holidayRanges: []
        });

        expect(result.fullSchedule).toHaveLength(5);
    });


    // TEST 6
    it("Báo lỗi khi totalClasses nhỏ hơn 1", () => {
        expect(() => {
            generateSchedule({
                startDate: "2026-04-01",
                totalClasses: 0,
                classWeekdays: [1, 3],
                holidays: [],
                holidayRanges: []
            });
        }).toThrow();
    });


    // TEST 7
    it("Báo lỗi khi startDate không hợp lệ", () => {
        expect(() => {
            generateSchedule({
                startDate: "2026-99-99",
                totalClasses: 5,
                classWeekdays: [1, 3],
                holidays: [],
                holidayRanges: []
            });
        }).toThrow();
    });

});