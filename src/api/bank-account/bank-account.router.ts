import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { AddBankAccount } from "./bank-account.dto";
import { add } from "./bank-account.controller";

const router = Router();

router.post('/',validate(AddBankAccount), add);