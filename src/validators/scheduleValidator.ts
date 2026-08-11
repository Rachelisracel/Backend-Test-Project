export interface ValidationDetail {
    field: string;
    reason: string;
}

export function validateScheduleInput(
    body: any
): ValidationDetail[] {

    const errors: ValidationDetail[] = [];

    // Kiểm tra startDate
    if (!body.startDate) {
        errors.push({
            field: "startDate",
            reason: "is required"
        });
    }

    // Kiểm tra totalClasses
    if (
        body.totalClasses === undefined ||
        body.totalClasses === null
    ) {
        errors.push({
            field: "totalClasses",
            reason: "is required"
        });
    } else if (
        typeof body.totalClasses !== "number" ||
        body.totalClasses < 1
    ) {
        errors.push({
            field: "totalClasses",
            reason: "must be >= 1"
        });
    }

    // Kiểm tra classWeekdays
    if (!Array.isArray(body.classWeekdays)) {
        errors.push({
            field: "classWeekdays",
            reason: "must be an array"
        });
    }

    // Kiểm tra holidays
    if (!Array.isArray(body.holidays)) {
        errors.push({
            field: "holidays",
            reason: "must be an array"
        });
    }

    // Kiểm tra holidayRanges
    if (!Array.isArray(body.holidayRanges)) {
        errors.push({
            field: "holidayRanges",
            reason: "must be an array"
        });
    }

    return errors;
}