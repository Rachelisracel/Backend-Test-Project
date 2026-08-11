import { describe, test, expect } from "vitest";
import { calcInvoice } from "../Bai3";

describe("Bài 3 - calcInvoice", () => {

    // Test 1: MONTHLY bình thường
    test("Tính tiền gói MONTHLY", () => {
        const result = calcInvoice(
            "MONTHLY",
            1000000,
            2,
            null,
            0,
            0
        );

        expect(result.subtotal).toBe(2000000);
        expect(result.discount).toBe(0);
        expect(result.refund).toBe(0);
        expect(result.total).toBe(2000000);
    });


    // Test 2: Giảm 10%
    test("Áp dụng mã SAVE10", () => {
        const result = calcInvoice(
            "MONTHLY",
            1500000,
            2,
            "SAVE10",
            0,
            0
        );

        expect(result.subtotal).toBe(3000000);
        expect(result.discount).toBe(300000);
        expect(result.total).toBe(2700000);
    });


    // Test 3: Giảm 50.000
    test("Áp dụng mã FLAT50K", () => {
        const result = calcInvoice(
            "FULL_COURSE",
            1000000,
            null,
            "FLAT50K",
            0,
            0
        );

        expect(result.subtotal).toBe(1000000);
        expect(result.discount).toBe(50000);
        expect(result.total).toBe(950000);
    });


    // Test 4: Hoàn tiền khi hủy buổi
    test("Tính tiền hoàn khi hủy lớp", () => {
        const result = calcInvoice(
            "MONTHLY",
            1000000,
            2,
            null,
            2,
            40000
        );

        expect(result.refund).toBe(80000);
        expect(result.total).toBe(1920000);
    });


    // Test 5: Clamp discount
    test("Discount không được lớn hơn subtotal", () => {
        const result = calcInvoice(
            "FULL_COURSE",
            30000,
            null,
            "FLAT50K",
            0,
            0
        );

        expect(result.discount).toBe(30000);
        expect(result.total).toBe(0);
    });


    // Test 6: Clamp total không âm
    test("Total không được âm", () => {
        const result = calcInvoice(
            "FULL_COURSE",
            100000,
            null,
            null,
            10,
            20000
        );

        expect(result.total).toBe(0);
    });


    // Test 7: months không hợp lệ
    test("Báo lỗi khi months ngoài khoảng 1-3", () => {
        expect(() =>
            calcInvoice(
                "MONTHLY",
                1000000,
                4,
                null,
                0,
                0
            )
        ).toThrow();
    });


    // Test 8: Giá tiền âm
    test("Báo lỗi khi basePrice âm", () => {
        expect(() =>
            calcInvoice(
                "MONTHLY",
                -1000000,
                1,
                null,
                0,
                0
            )
        ).toThrow();
    });

});