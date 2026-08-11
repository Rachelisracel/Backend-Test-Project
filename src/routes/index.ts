import { Router } from "express";

import { generateScheduleController } from "../controllers/scheduleController";
import { calcInvoiceController } from "../controllers/invoiceController";

const router = Router();

router.post(
    "/schedule/generate",
    generateScheduleController
);

router.post(
    "/invoice/calc",
    calcInvoiceController
);

export default router;