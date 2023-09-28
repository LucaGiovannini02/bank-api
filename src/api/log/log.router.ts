import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { AddLogDTO } from "./log.dto";
import { addPhoneLog, addBankTransferLog, loginUserLog, registerUserLog } from "./log.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";

const router = Router();

router.use(isAuthenticated);
router.post('/login', validate(AddLogDTO), loginUserLog);
router.post('/register', validate(AddLogDTO), registerUserLog);
router.post('/transaction', validate(AddLogDTO), addBankTransferLog);
router.post('/phone', validate(AddLogDTO), addPhoneLog);

export default router;