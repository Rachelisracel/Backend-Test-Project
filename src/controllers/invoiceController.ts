import { Request, Response } from "express";

import { calcInvoice } from "../services/invoiceService";

import {
    validateInvoiceInput
} from "../validators/invoiceValidator";


export function calcInvoiceController(
    req: Request,
    res: Response
) {

    try {

        // 1. Kiểm tra dữ liệu
        const errors =
            validateInvoiceInput(req.body);

        if (errors.length > 0) {

            return res.status(400).json({
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Invalid input",
                    details: errors
                }
            });
        }

        // 2. Gọi business logic
        const result = calcInvoice(
            req.body.courseType,
            req.body.basePrice,
            req.body.months,
            req.body.promoCode,
            req.body.canceledClasses,
            req.body.refundPerClass
        );

        // 3. Trả kết quả
        return res.status(200).json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal server error"
            }
        });
    }
}