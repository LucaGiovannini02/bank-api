import { Log } from "./log.entity";
import { Log as LogModel } from "./log.model";

export class LogService {

    async registerUserLog(userId: string, ip: string, isGoodEnded: boolean): Promise<Log> {
        let log: Log = {};
        log.userId = userId;
        log.type = "attempted_registration";
        log.ip = ip;
        log.date = new Date();
        log.isGoodEnded = isGoodEnded;
        let newLog = await LogModel.create({ ...log });
        return await newLog.populate(['userId']);
    }

    async loginUserLog(userId: string, ip: string, isGoodEnded: boolean): Promise<Log> {
        let log: Log = {};
        log.userId = userId;
        log.type = "attempted_login";
        log.ip = ip;
        log.date = new Date();
        log.isGoodEnded = isGoodEnded;
        let newLog = await LogModel.create({ ...log });
        return await newLog.populate(['userId']);
    }

    async addBankTransferLog(userId: string, ip: string, isGoodEnded: boolean): Promise<Log> {
        let log: Log = {};
        log.userId = userId;
        log.type = "attempted_bank_transfer";
        log.ip = ip;
        log.date = new Date();
        log.isGoodEnded = isGoodEnded;
        let newLog = await LogModel.create({ ...log });
        return await newLog.populate(['userId']);
    }

    async addPhoneLog(userId: string, ip: string, isGoodEnded: boolean): Promise<Log> {
        let log: Log = {};
        log.userId = userId;
        log.type = "attempted_phone_recharge";
        log.ip = ip;
        log.date = new Date();
        log.isGoodEnded = isGoodEnded;
        let newLog = await LogModel.create({ ...log });
        return await newLog.populate(['userId']);
    }
}

export default new LogService();