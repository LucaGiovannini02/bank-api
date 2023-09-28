import { NextFunction, Request, Response } from 'express';
import logService from "./log.service";

export const addUserLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip = req.ip;
    let newLog = await logService.addUserLog(req.user?.id!, ip);
    res.status(201).json(newLog);
  } catch (error) {
    next(error);
  }
};

export const addTransactionLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip = req.ip;
    let newLog = await logService.addTransactionLog(req.user?.id!, ip);
    res.status(201).json(newLog);
  } catch (error) {
    next(error);
  }
};

export const addPhoneLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip = req.ip;
    let newLog = await logService.addPhoneLog(req.user?.id!, ip);
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500);
    res.send(error);
    next(error);
  }
};
