import { NextFunction, Request, Response } from 'express';
import logService from "./log.service";

export const addUserLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let newLog = await logService.addUserLog(req.user?.id!, req.ip, req.body.isGoodEnded);
    res.status(201).json(newLog);
  } catch (error) {
    next(error);
  }
};

export const addBankTransferLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let newLog = await logService.addBankTransferLog(req.user?.id!, req.ip, req.body.isGoodEnded);
    res.status(201).json(newLog);
  } catch (error) {
    next(error);
  }
};

export const addPhoneLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let newLog = await logService.addPhoneLog(req.user?.id!, req.ip, req.body.isGoodEnded);
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500);
    res.send(error);
    next(error);
  }
};
