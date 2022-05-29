import LogRepository from "./LogRepository.js";
import GenerateUUIDService from "./GenerateUUIDService.js";
import CountLogs from "./CountLogs.js";
import SaveLog from "./SaveLog.js";
import ClearLogs from "./ClearLogs.js";

export class CountLogsController {
    async handle() {
        try {
            const logRepository = new LogRepository();
            const countLogs = new CountLogs(logRepository);
            const output = await countLogs.execute();

            return { statusCode: 200, body: output };
        } catch (error) {
            return { statusCode: 500, body: error.stack };
        }
    }
}

export class SaveLogController {
    async handle(body = {}) {
        try {
            const requiredFields = ["pid", "content"];
            const isValid = requiredFields.every((item) => body.hasOwnProperty(item));

            if (!isValid) {
                throw new Error(`This fields: ${requiredFields.join(", ")} is required.`);
            }

            const logRepository = new LogRepository();
            const generateUUIDService = new GenerateUUIDService();
            const saveLog = new SaveLog(logRepository, generateUUIDService);

            const output = await saveLog.execute(body.pid, body.content);

            return { statusCode: 200, body: output };
        } catch (error) {
            return { statusCode: 500, body: error.stack };
        }
    }
}

export class ClearLogsController {
    async handle() {
        try {
            const logRepository = new LogRepository();
            const clearLogs = new ClearLogs(logRepository);

            const output = await clearLogs.execute();

            return { statusCode: 200, body: output };
        } catch (error) {
            return { statusCode: 500, body: error.stack };
        }
    }
}
