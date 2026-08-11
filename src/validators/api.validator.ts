export interface ValidationDetail {
    field: string;
    reason: string;
}

export function validationError(
    details: ValidationDetail[]
) {
    return {
        error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details
        }
    };
}