import { Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddBankAccount } from "./bank-account.dto";
import bankAccountService from "./bank-account.service";

export let add = async (req: TypedRequest<AddBankAccount, any>, res: Response, next: NextFunction) => {
  try {
    let newBankAccount = await bankAccountService.add(req.user?.id!);
    res.json(newBankAccount);
  }
  catch (err) {
    res.status(400);
    res.send(err);
    next(err);
  }
}