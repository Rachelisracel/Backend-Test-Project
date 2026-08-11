export function validateInvoiceInput(body: any) {

    const details: any[] = [];

    // Kiểm tra courseType
    if (
        body.courseType !== "MONTHLY" &&
        body.courseType !== "FULL_COURSE"
    ) {
        details.push({
            field: "courseType",
            reason: "must be MONTHLY or FULL_COURSE"
        });
    }

    // Kiểm tra basePrice
    if (
        typeof body.basePrice !== "number" ||
        body.basePrice < 0
    ) {
        details.push({
            field: "basePrice",
            reason: "must be >= 0"
        });
    }

    // MONTHLY phải có months từ 1 đến 3
    if (
        body.courseType === "MONTHLY" &&
        (
            typeof body.months !== "number" ||
            body.months < 1 ||
            body.months > 3
        )
    ) {
        details.push({
            field: "months",
            reason: "must be between 1 and 3"
        });
    }

    // Kiểm tra promoCode
    if (
        body.promoCode !== null &&
        body.promoCode !== "SAVE10" &&
        body.promoCode !== "FLAT50K"
    ) {
        details.push({
            field: "promoCode",
            reason: "invalid promo code"
        });
    }

    // canceledClasses
    if (
        typeof body.canceledClasses !== "number" ||
        body.canceledClasses < 0
    ) {
        details.push({
            field: "canceledClasses",
            reason: "must be >= 0"
        });
    }

    // refundPerClass
    if (
        typeof body.refundPerClass !== "number" ||
        body.refundPerClass < 0
    ) {
        details.push({
            field: "refundPerClass",
            reason: "must be >= 0"
        });
    }

    return details;
}