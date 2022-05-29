import LogRepository from "./LogRepository.js";

export default class ClearLogs {
    constructor(logsRepository = new LogRepository()) {
        this.logsRepository = logsRepository;
    }

    async execute() {
        const total = await this.logsRepository.count();
        await this.logsRepository.clear();
        return `Cleared total of ${total} logs.`;
    }
}
