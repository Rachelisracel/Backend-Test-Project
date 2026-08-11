import { Request, Response } from "express";
import { generateSchedule } from "../services/scheduleService";
import { validateScheduleInput } from "../validators/scheduleValidator";
import { validationError } from "../validators/api.validator";

export function generateScheduleController(
    req: Request,
    res: Response
) {

    try {

        // 1. Validate dữ liệu
        const errors = validateScheduleInput(req.body);

        if (errors.length > 0) {
            return res.status(400).json(
                validationError(errors)
            );
        }

        // 2. Gọi business logic
        const result = generateSchedule(req.body);

        // 3. Trả kết quả
        return res.status(200).json(result);

    } catch (error: any) {

        console.error(error);

        return res.status(500).json({
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal server error"
            }
        });
    }
}