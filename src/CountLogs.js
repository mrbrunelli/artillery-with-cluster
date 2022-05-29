import LogRepository from "./LogRepository.js";

export default class CountLogs {
    constructor(logRepository = new LogRepository()) {
        this.logRepository = logRepository;
    }

    async execute() {
        const output = await this.logRepository.count();
        return output;
    }
}
